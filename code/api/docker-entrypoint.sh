
echo "Waiting for MySQL..."
/usr/local/mysql/bin/mysql -u root
Create Database ProjectX CHARACTER SET utf8;

exit

python3 server.py