from db import db



class User(db.Model):
	__tablename__ = "User"
	id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
	password_hash = db.Column(db.String(64), nullable=False)

	def __init__(self,password_hash):
		self.password_hash = password_hash



class Note(db.Model):
	__tablename__ = "Note"
	id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
	text = db.Column(db.String(2000), nullable=False)
	date = db.Column(db.DateTime, nullable=False)
	location = db.Column(db.String(150), nullable=True)

	def __init__(self,text,date,location=None):
		self.text = text
		self.date = date
		if location:
			self.location = location


class TokenBlacklist(db.Model):
	__tablename__ = "TokenBlacklist"

	id = db.Column(db.Integer, primary_key=True, autoincrement=True)
	token = db.Column(db.String(150), unique=True, nullable=False)

	def __init__(self,token):
		self.token = token