import sqlite3
conn = sqlite3.connect('prisma/app.db')
cur = conn.cursor()
for table in ['User','ClientProfile','ClientJob','ClientJobAttachment','CmsPage','ProjectTransaction','ProjectNegotiation','WebsitePage','ServiceCategory','PageTextOverride']:
    print('TABLE', table)
    for row in cur.execute(f'PRAGMA table_info("{table}")'):
        print(row)
    print('FK', cur.execute(f'PRAGMA foreign_key_list("{table}")').fetchall())
    print('INDEX', cur.execute(f'PRAGMA index_list("{table}")').fetchall())
    print()
conn.close()
