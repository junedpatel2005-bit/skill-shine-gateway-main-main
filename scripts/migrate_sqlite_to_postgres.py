import os
import re
import shutil
import sqlite3
import sys
from datetime import datetime
from pathlib import Path

import psycopg2
from psycopg2 import extras

ROOT = Path(__file__).resolve().parent.parent
SQLITE_DB = ROOT / 'prisma' / 'app.db'
BACKUP_DB = ROOT / 'prisma' / 'backups' / f'app.db.backup-{datetime.now().strftime("%Y%m%d-%H%M%S")}.db'
ENV_PATH = ROOT / '.env'


def parse_env(path: Path) -> dict[str, str]:
    env = {}
    if not path.exists():
        return env
    for raw_line in path.read_text(encoding='utf-8').splitlines():
        line = raw_line.strip()
        if not line or line.startswith('#') or '=' not in line:
            continue
        key, value = line.split('=', 1)
        key = key.strip()
        value = value.strip()
        if value and value[0] in {'"', "'"} and value[-1] == value[0]:
            value = value[1:-1]
        env[key] = value
    return env


def quote_ident(name: str) -> str:
    return '"' + name.replace('"', '""') + '"'


def sqlite_type_to_pg(sqlite_type: str | None) -> str:
    if not sqlite_type:
        return 'TEXT'
    t = sqlite_type.upper().strip()
    if 'INT' in t or 'INTEGER' in t or 'BIGINT' in t:
        return 'BIGINT' if 'BIGINT' in t else 'INTEGER'
    if 'REAL' in t or 'FLOAT' in t or 'DOUBLE' in t:
        return 'DOUBLE PRECISION'
    if 'BOOL' in t:
        return 'BOOLEAN'
    if 'DECIMAL' in t or 'NUMERIC' in t or 'MONEY' in t:
        return 'NUMERIC'
    if 'BLOB' in t:
        return 'BYTEA'
    if 'JSON' in t:
        return 'JSONB'
    if 'TIMESTAMP' in t or 'DATETIME' in t or 'DATE' in t or 'TIME' in t:
        return 'TIMESTAMP'
    if 'VARCHAR' in t or 'CHAR' in t:
        return 'VARCHAR'
    return 'TEXT'


def normalize_default(default: str | None) -> str | None:
    if default is None:
        return None
    default = default.strip()
    if not default:
        return None
    if default.startswith("'") and default.endswith("'"):
        return default
    if default.startswith('"') and default.endswith('"'):
        return default
    if re.fullmatch(r'-?\d+(\.\d+)?', default):
        return default
    if re.search(r"datetime\(['\"]now['\"]", default, re.I):
        return 'CURRENT_TIMESTAMP'
    if default.upper() in {'CURRENT_TIMESTAMP', 'CURRENT_DATE', 'CURRENT_TIME', 'TRUE', 'FALSE', 'NULL'}:
        return default.upper()
    return default


def get_table_names(sqlite_conn: sqlite3.Connection) -> list[str]:
    rows = sqlite_conn.execute("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name").fetchall()
    return [row[0] for row in rows]


def inspect_sqlite_schema(sqlite_conn: sqlite3.Connection, table: str) -> dict:
    table_info = sqlite_conn.execute(f'PRAGMA table_info("{table}")').fetchall()
    foreign_keys = sqlite_conn.execute(f'PRAGMA foreign_key_list("{table}")').fetchall()
    indexes = sqlite_conn.execute(f'PRAGMA index_list("{table}")').fetchall()
    index_defs = []
    for index_row in indexes:
        index_name = index_row[1]
        if not index_name:
            continue
        index_info = sqlite_conn.execute(f'PRAGMA index_info("{index_name}")').fetchall()
        index_defs.append({
            'name': index_name,
            'unique': bool(index_row[2]),
            'origin': index_row[3],
            'columns': [col[2] for col in index_info],
        })
    return {'columns': table_info, 'foreign_keys': foreign_keys, 'indexes': index_defs}


def table_exists(pg_conn, table: str) -> bool:
    with pg_conn.cursor() as cur:
        cur.execute("SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name=%s)", (table,))
        return bool(cur.fetchone()[0])


def reset_target_schema(pg_conn) -> None:
    with pg_conn.cursor() as cur:
        cur.execute("DROP SCHEMA IF EXISTS public CASCADE")
        cur.execute("CREATE SCHEMA public")
        pg_conn.commit()


def create_table_sql(table: str, schema: dict) -> str:
    column_defs = []
    pk_columns = []
    for cid, name, data_type, notnull, default_value, pk in schema['columns']:
        pg_type = sqlite_type_to_pg(data_type)
        expr = f'{quote_ident(name)} {pg_type}'
        if pk:
            pk_columns.append(name)
        if not pk:
            if notnull:
                expr += ' NOT NULL'
            normalized_default = normalize_default(default_value)
            if normalized_default is not None:
                expr += f' DEFAULT {normalized_default}'
        column_defs.append(expr)
    if pk_columns:
        if len(pk_columns) == 1:
            pk_name = pk_columns[0]
            column_defs = [
                defn if not (defn.startswith(quote_ident(pk_name)) and 'PRIMARY KEY' not in defn) else defn + ' PRIMARY KEY'
                for defn in column_defs
            ]
        else:
            pk_clause = 'PRIMARY KEY (' + ', '.join(quote_ident(c) for c in pk_columns) + ')'
            column_defs.append(pk_clause)
    fks = []
    for fk in schema['foreign_keys']:
        _, _, ref_table, from_col, to_col, on_update, on_delete, _ = fk
        constraint_name = f'{table}_{from_col}_fkey'
        clause = f'CONSTRAINT {quote_ident(constraint_name)} FOREIGN KEY ({quote_ident(from_col)}) REFERENCES {quote_ident(ref_table)} ({quote_ident(to_col)})'
        if on_delete:
            clause += f' ON DELETE {on_delete}'
        if on_update:
            clause += f' ON UPDATE {on_update}'
        fks.append(clause)
    sql_parts = column_defs + fks
    return 'CREATE TABLE ' + quote_ident(table) + ' (\n  ' + ',\n  '.join(sql_parts) + '\n);'


def create_table_if_needed(sqlite_conn: sqlite3.Connection, pg_conn, table: str) -> None:
    if table_exists(pg_conn, table):
        return
    schema = inspect_sqlite_schema(sqlite_conn, table)
    create_sql = create_table_sql(table, schema)
    with pg_conn.cursor() as cur:
        cur.execute(create_sql)
        pg_conn.commit()


def create_indexes_if_needed(sqlite_conn: sqlite3.Connection, pg_conn, table: str) -> None:
    schema = inspect_sqlite_schema(sqlite_conn, table)
    with pg_conn.cursor() as cur:
        for index in schema['indexes']:
            if index['origin'] == 'pk':
                continue
            if not index['columns']:
                continue
            columns_sql = ', '.join(quote_ident(col) for col in index['columns'])
            index_name = index['name'] or f'{table}_{"_".join(index["columns"])}'
            safe_name = re.sub(r'[^a-zA-Z0-9_]', '_', index_name)
            if len(safe_name) > 63:
                safe_name = safe_name[:63]
            if index['unique']:
                cur.execute(f'CREATE UNIQUE INDEX IF NOT EXISTS {quote_ident(safe_name)} ON {quote_ident(table)} ({columns_sql})')
            else:
                cur.execute(f'CREATE INDEX IF NOT EXISTS {quote_ident(safe_name)} ON {quote_ident(table)} ({columns_sql})')
        pg_conn.commit()


def get_table_order(sqlite_conn: sqlite3.Connection, tables: list[str]) -> list[str]:
    schema_cache = {table: inspect_sqlite_schema(sqlite_conn, table) for table in tables}
    table_to_refs = {table: [fk[2] for fk in schema_cache[table]['foreign_keys']] for table in tables}
    ordering = []
    remaining = set(tables)
    while remaining:
        ready = [t for t in remaining if all(ref not in remaining for ref in table_to_refs[t])]
        if not ready:
            ready = sorted(remaining)
        ready.sort()
        next_table = ready[0]
        ordering.append(next_table)
        remaining.remove(next_table)
    return ordering


def insert_rows(sqlite_conn: sqlite3.Connection, pg_conn, table: str) -> None:
    schema = inspect_sqlite_schema(sqlite_conn, table)
    column_names = [col[1] for col in schema['columns']]
    quoted_columns = ', '.join(quote_ident(col) for col in column_names)
    placeholders = ', '.join(['%s'] * len(column_names))
    rows = sqlite_conn.execute(f'SELECT * FROM "{table}"').fetchall()
    if not rows:
        return
    print(f'Inserting rows for {table} ({len(rows)})')
    with pg_conn.cursor() as cur:
        for row in rows:
            values = []
            for idx, value in enumerate(row):
                col_type = schema['columns'][idx][2]
                if value is None:
                    values.append(None)
                elif 'BOOL' in str(col_type).upper():
                    values.append(bool(value))
                elif isinstance(value, (bytes, bytearray)):
                    values.append(psycopg2.Binary(value))
                else:
                    values.append(value)
            cur.execute(f'INSERT INTO {quote_ident(table)} ({quoted_columns}) VALUES ({placeholders})', values)
        pg_conn.commit()


def verify_migration(sqlite_conn: sqlite3.Connection, pg_conn, tables: list[str]) -> None:
    with pg_conn.cursor() as cur:
        for table in tables:
            source_count = sqlite_conn.execute(f'SELECT COUNT(*) FROM "{table}"').fetchone()[0]
            cur.execute(f'SELECT COUNT(*) FROM {quote_ident(table)}')
            count_pg = cur.fetchone()[0]
            if count_pg != source_count:
                raise RuntimeError(f'Row-count mismatch for {table}: sqlite={source_count} postgres={count_pg}')
        print('Verified row counts for all migrated tables.')


def main() -> None:
    env = parse_env(ENV_PATH)
    direct_url = env.get('DIRECT_URL') or os.getenv('DIRECT_URL')
    if not direct_url:
        raise RuntimeError('DIRECT_URL is not set in the environment or .env file.')
    BACKUP_DB.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(SQLITE_DB, BACKUP_DB)
    print(f'Backup created at {BACKUP_DB}')
    sqlite_conn = sqlite3.connect(SQLITE_DB)
    pg_conn = psycopg2.connect(direct_url)
    pg_conn.autocommit = False
    try:
        tables = get_table_names(sqlite_conn)
        print(f'Found {len(tables)} tables to migrate.')
        reset_target_schema(pg_conn)
        ordered_tables = get_table_order(sqlite_conn, tables)
        for table in ordered_tables:
            create_table_if_needed(sqlite_conn, pg_conn, table)
        for table in ordered_tables:
            insert_rows(sqlite_conn, pg_conn, table)
        for table in tables:
            create_indexes_if_needed(sqlite_conn, pg_conn, table)
        verify_migration(sqlite_conn, pg_conn, tables)
        print('Migration completed.')
    finally:
        sqlite_conn.close()
        pg_conn.close()


if __name__ == '__main__':
    try:
        main()
    except Exception as exc:
        print(f'ERROR: {exc}', file=sys.stderr)
        sys.exit(1)
