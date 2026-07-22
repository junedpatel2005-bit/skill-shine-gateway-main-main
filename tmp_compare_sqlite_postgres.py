import sqlite3
from pathlib import Path
import psycopg2

ROOT = Path(__file__).resolve().parent
p = ROOT / '.env'
env = {}
for raw_line in p.read_text(encoding='utf-8').splitlines():
    line = raw_line.strip()
    if not line or line.startswith('#') or '=' not in line:
        continue
    key, value = line.split('=', 1)
    value = value.strip()
    if value and value[0] in {'"', "'"} and value[-1] == value[0]:
        value = value[1:-1]
    env[key] = value

direct_url = env.get('DIRECT_URL')
print('DIRECT_URL_PRESENT', bool(direct_url))

sqlite_conn = sqlite3.connect(ROOT / 'prisma' / 'app.db')
pg_conn = psycopg2.connect(direct_url)
pg_cur = pg_conn.cursor()

sqlite_cur = sqlite_conn.cursor()
sqlite_cur.execute("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name")
source_tables = [row[0] for row in sqlite_cur.fetchall()]

pg_cur.execute("SELECT table_name FROM information_schema.tables WHERE table_schema='public' ORDER BY table_name")
target_tables = [row[0] for row in pg_cur.fetchall()]

print('TABLES_IN_SQLITE', len(source_tables))
print('TABLES_IN_POSTGRES', len(target_tables))
missing_tables = [t for t in source_tables if t not in target_tables]
print('MISSING_TABLES', missing_tables)

all_match = True
for table in source_tables:
    sqlite_cur.execute(f'SELECT COUNT(*) FROM "{table}"')
    src_count = sqlite_cur.fetchone()[0]
    pg_cur.execute(f'SELECT COUNT(*) FROM "{table}"')
    pg_count = pg_cur.fetchone()[0]
    if src_count != pg_count:
        all_match = False
        print('COUNT_MISMATCH', table, src_count, pg_count)
    else:
        print('COUNT_OK', table, src_count)

if all_match:
    print('ROW_COUNT_CHECK', 'PASS')
else:
    print('ROW_COUNT_CHECK', 'FAIL')

# verify sample records present
pg_cur.execute('SELECT id, email FROM "User" ORDER BY id')
user_rows = pg_cur.fetchall()
print('USER_ROWS', user_rows)

sqlite_cur.execute('SELECT id, email FROM "User" ORDER BY id')
source_user_rows = sqlite_cur.fetchall()
print('SOURCE_USER_ROWS', source_user_rows)

if user_rows == source_user_rows:
    print('USER_RECORDS_MATCH', 'PASS')
else:
    print('USER_RECORDS_MATCH', 'FAIL')

sqlite_conn.close()
pg_conn.close()
