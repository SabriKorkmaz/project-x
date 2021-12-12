import mysql.connector

myDb = mysql.connector.connect(
    user='user',
    host='localhost',
    passwd='swe573573')

my_cursor = myDb.cursor();
my_cursor.execute('Create Database ProjectX')

my_cursor.execute('SHOW DATABASES')
for db in my_cursor:
    print(db)

print("Db created successfully!")
