import os
from pathlib import Path
import psycopg2

ROOT = Path(__file__).resolve().parent
env = {}
for raw_line in (ROOT / '.env').read_text(encoding='utf-8').splitlines():
    line = raw_line.strip()
    if not line or line.startswith('#') or '=' not in line:
        continue
    key, value = line.split('=', 1)
    value = value.strip()
    if value and value[0] in {'"', "'"} and value[-1] == value[0]:
        value = value[1:-1]
    env[key] = value

dsn = env.get('DIRECT_URL') or os.getenv('DIRECT_URL')
print('DSN_OK', bool(dsn))
conn = psycopg2.connect(dsn)
cur = conn.cursor()
cur.execute("SELECT table_schema, table_name FROM information_schema.tables WHERE table_schema='public' ORDER BY table_name")
rows = cur.fetchall()
print('TABLES', len(rows))
for schema, name in rows[:50]:
    cur.execute(f'SELECT COUNT(*) FROM "{name}"')
    print(name, cur.fetchone()[0])
conn.close()
