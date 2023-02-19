from flask_mysqldb import MySQL

SQL_CONFIG = {
	'MYSQL_HOST': 'localhost',
	'MYSQL_USER': 'diary_admin',
	'MYSQL_PASSWORD': 'dpass1702',
	'MYSQL_DB': 'diary_db'
}


db = MySQL()