import sqlite3

db = sqlite3.connect("prisma/app.db")
cursor = db.cursor()

tables = cursor.execute("""
    SELECT name
    FROM sqlite_master
    WHERE type = 'table'
    AND name NOT LIKE 'sqlite_%'
""").fetchall()

print("\nOLD PRISMA DATABASE (prisma/app.db)")
print("=" * 50)

total = 0

for (table,) in tables:
    count = cursor.execute(
        f'SELECT COUNT(*) FROM "{table}"'
    ).fetchone()[0]

    print(f"{table}: {count} records")
    total += count

print("=" * 50)
print(f"TOTAL RECORDS: {total}")

db.close()
