
echo "Waiting for MySQL..."
/usr/local/mysql/bin/mysql -u root
Create Database ProjectX;
exit

python3 server.py