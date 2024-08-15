import pymysql
class Frame():
    def __init__(self):
        self.conn=pymysql.connect(
            host='localhost',
            user="root",
            passwd="qweasd123456",
            database="workstation305",
            charset="utf8mb4",
            autocommit=True
        )
        self.cursor=self.conn.cursor() #游标，利用游标查询数据
    # cursor.execute("select * from people")
    # result : tuple=cursor.fetchall() #结果使用fetchall拿出来，类型为元组
    # print(result)

    def findAll(self):
        self.cursor.execute("select * from people")
        result : tuple=self.cursor.fetchall()
        return result
    # def findPeopleBySN(self,SN):
    #     self.cursor.execute("select * from people where SN1='{}' or SN2='{}'".format(SN,SN))
    #     result : tuple=self.cursor.fetchall()
    #     return result
    def findPeopleByNumber(self,Number):
        self.cursor.execute("select * from people where number={}".format(Number))
        result : tuple=self.cursor.fetchall()
        return result
    def findPeopleByName(self,name):
        self.cursor.execute("select * from people where name='{}'".format(name))
        result : tuple=self.cursor.fetchall()
        return result
    def addOftenTime(self,number):
        try:
            self.cursor.execute("update people set allTime=allTime+1 where number={}".format(number))
        except Exception :
            return 'something wrong'
        else: 'ok'