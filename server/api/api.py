from flask import jsonify, request, Response
from flask_api import status
from flask_restful import Resource
# from flask_login import LoginManager, login_user, logout_user, UserMixin, login_required
import jwt
import json
import hashlib
import datetime

from api.database import db
from config import config


# login_manager = LoginManager()

version = '0'

class Notes_API(Resource):

	def get(self):
		cur = db.connection.cursor()
		cur.execute('''SELECT * FROM note;''')
		data = json.dumps(cur.fetchall())
		db.connection.commit()
		cur.close()
		return Response(data, mimetype="application/json", status=status.HTTP_200_OK)

	def post(self):

		data = request.form.to_dict()
		id = data['id']

		if not id.isdigit():
			return f"TypeError: id must be an integer, not {type(id).__name__}", 400

		cur = db.connection.cursor()
		query = f'''
			INSERT INTO note VALUES(
				{id}
			);
		'''
		cur.execute(query)

		db.connection.commit()
		cur.close()
		return Response('', status=status.HTTP_200_OK)


class Note_API(Resource):

	def get(self,id):
		cur = db.connection.cursor()
		cur.execute(f'''SELECT * FROM note WHERE id = {id};''')
		data = json.dumps(cur.fetchall())

		db.connection.commit()
		cur.close()
		return Response(data, mimetype='application/json', status=status.HTTP_200_OK)


	def put(self,id):

		data = request.form.to_dict()
		new_id = int(data['new_id'])
		cur = db.connection.cursor()
		cur.execute(f'''UPDATE note SET id={new_id} WHERE id = {id};''')

		db.connection.commit()
		cur.close()
		return Response('', status=status.HTTP_200_OK)








# class Auth_API(Resource):
# 	def post(self):
# 		# print('hello')
# 		password = request.form['password']
# 		hash = hashlib.new('sha256')
# 		hash.update(bytes(password, 'utf-8'))
# 		password_hash = str(hash.hexdigest())

# 		cur = db.connection.cursor()
# 		cur.execute('''SELECT password_hash FROM user WHERE id=1;''')
# 		raw_data = cur.fetchall()
# 		data = json.dumps(raw_data)
# 		db.connection.commit()
# 		cur.close()
# 		user = User()
# 		user.id = 1
# 		users_password = ''.join(list(raw_data[0][0]))
# 		if password_hash == users_password:
# 			login_user(user)
# 			return Response('logged in', mimetype='application/json', status=status.HTTP_200_OK)

# 		return Response('Unauthorized', mimetype='application/json', status=status.HTTP_401_UNAUTHORIZED)

# 	@login_required
# 	def put(self):
# 		logout_user()
# 		return 'Logged out', 200

	# def put(self):
	# 	password = request.form['password']
	# 	hash = hashlib.new('sha256')
	# 	hash.update(bytes(password, 'utf-8'))
	# 	password_hash = str(hash.hexdigest())
	# 	print(password, password_hash)

	# 	cur = db.connection.cursor()
	# 	cur.execute(f'''INSERT INTO user (id, password_hash) VALUES(1, '{password_hash}'); ''')
	# 	db.connection.commit()
	# 	cur.close()
	# 	return Response('', status=status.HTTP_200_OK)


class Auth_API(Resource):
	def post(self):

		if not 'password' in request.form or not request.form['password']:
			return Response('incorrect login data', status=status.HTTP_401_UNAUTHORIZED)
		password = request.form['password']
		hash = hashlib.new('sha256')
		hash.update(bytes(password, 'utf-8'))
		password_hash = str(hash.hexdigest())

		cur = db.connection.cursor()
		cur.execute('''SELECT password_hash FROM user WHERE id=1;''')
		raw_data = cur.fetchall()
		data = json.dumps(raw_data)
		db.connection.commit()
		cur.close()
		user_password_hash = ''.join(list(raw_data[0][0]))
		if password_hash == user_password_hash:
			print("hehe got u")
			token = jwt.encode({'public_id': 'admin', 'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=20)}, config['SECRET_KEY'], algorithm="HS256")
			return jsonify({'token' : jwt.decode(token, config['SECRET_KEY'], algorithms="HS256")})
		print("hehe got u")
		return Response('incorrect login data', status=status.HTTP_401_UNAUTHORIZED)






