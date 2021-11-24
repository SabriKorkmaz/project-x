import mysql.connector

myDb = mysql.connector.connect(
    host='localhost',
    user='root',
    passwd='swe573573')

my_cursor = myDb.cursor();
# my_cursor.execute('Create Database ProjectX')

my_cursor.execute('SHOW DATABASES')
for db in my_cursor:
    print(db)

