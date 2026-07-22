import sqlite3
import os

files = ['prisma/app.db', 'prisma/dev.db']
for f in files:
    print(f'PATH {f}')
    if not os.path.exists(f):
        print('MISSING')
        continue
    conn = sqlite3.connect(f)
    cur = conn.cursor()
    cur.execute("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name")
    for (name,) in cur.fetchall():
        cur.execute(f'SELECT count(*) FROM "{name}"')
        print(name, cur.fetchone()[0])
    conn.close()
