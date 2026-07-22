import sqlite3
import sys
from pathlib import Path
sys.path.append(str(Path('scripts').resolve()))
import migrate_sqlite_to_postgres as m

conn = sqlite3.connect('prisma/app.db')
for table in ['User','ClientProfile','ServiceCategory','PageTextOverride']:
    schema = m.inspect_sqlite_schema(conn, table)
    print('TABLE', table)
    print(m.create_table_sql(table, schema))
    print()
conn.close()
