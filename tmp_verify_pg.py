import os
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

conn = psycopg2.connect(env['DIRECT_URL'])
cur = conn.cursor()
cur.execute("SELECT table_name FROM information_schema.tables WHERE table_schema='public' ORDER BY table_name")
tables = [r[0] for r in cur.fetchall()]
print('TABLE_COUNT', len(tables))
print('SAMPLE_TABLES', tables[:20])
cur.execute('SELECT COUNT(*) FROM "User"')
print('USER_COUNT', cur.fetchone()[0])
cur.execute('SELECT COUNT(*) FROM "ClientJob"')
print('CLIENTJOB_COUNT', cur.fetchone()[0])
cur.execute('SELECT COUNT(*) FROM "cms_pages"')
print('CMSPAGES_COUNT', cur.fetchone()[0])
cur.execute('SELECT id, email FROM "User" ORDER BY id LIMIT 5')
print('USER_SAMPLE', cur.fetchall())
conn.close()
