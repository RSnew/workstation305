import pymysql

## 
# 将表结构迁移到 user_tables 多对多关系表
connection = pymysql.connect(
    host='localhost',
    user='root',
    password='qweasd123456',
    db='workstation305',
    charset='utf8mb4'
)
cursor=connection.cursor()
# cursor.execute('SELECT * FROM people')
# user=cursor.fetchone()
# print(user[0])
cursor.execute('SELECT * FROM people;')
user=cursor.fetchall()
connection.begin()
# print(user)
for userTemp in user:
    userSN1 = userTemp[0]
    userSN2 = userTemp[1]
    userNumber = userTemp[2]
    if userSN1 is not None:
        cursor.execute('insert into user_tables (SN, number) values (%s, %s);',(userSN1, userNumber))
    if userSN2 is not None:
        cursor.execute('insert into user_tables (SN, number) values (%s, %s);',(userSN2, userNumber))
connection.commit()
cursor.close()
connection.close()