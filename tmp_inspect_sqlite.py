import sqlite3
conn = sqlite3.connect('prisma/app.db')
cur = conn.cursor()
cur.execute("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name")
rows = cur.fetchall()
print('TABLES', len(rows))
for (name,) in rows:
    cur2 = conn.cursor()
    cur2.execute(f'SELECT COUNT(*) FROM "{name}"')
    print(name, cur2.fetchone()[0])
conn.close()
