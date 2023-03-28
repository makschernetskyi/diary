from flask_sqlalchemy import SQLAlchemy


SQL_CONFIG = {
	"SQLALCHEMY_DATABASE_URI": "mysql://diary_admin:dpass1702@localhost/diary_db"
}



db = SQLAlchemy()