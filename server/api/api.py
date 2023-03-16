from flask import jsonify, request, Response
from flask_api import status
from flask_restful import Resource
# from flask_login import LoginManager, login_user, logout_user, UserMixin, login_required
import jwt
import json
import hashlib
import datetime
from functools import wraps
import traceback

from api.database import db
from config import config


# login_manager = LoginManager()

version = '0'




def token_required(f):
	@wraps(f)
	def decorator(*args, **kwargs):

		token = None

		if 'x-access-tokens' in request.headers:
			token = request.headers['x-access-tokens']

		if not token:
			return Response('unauthorized', status=status.HTTP_401_UNAUTHORIZED)

		try:

			token_data = jwt.decode(token, config['SECRET_KEY'], algorithms = "HS256")
			cur = db.connection.cursor()
			cur.execute(f'''SELECT id FROM user WHERE id={token_data['public_id']};''')
			raw_data = cur.fetchall()
			db.connection.commit()
			cur.close()
			data = json.dumps(raw_data)
			current_user = ''.join(list(data[0][0]))
		except:
			traceback.print_exc()
			return Response('unauthorized', status=status.HTTP_401_UNAUTHORIZED)

		return f(*args, **kwargs)
	return decorator


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
			token = jwt.encode({'public_id': '1', 'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=20)}, config['SECRET_KEY'], algorithm="HS256")
			return jsonify({'token' : token})
		print("hehe got u")
		return Response('incorrect login data', status=status.HTTP_401_UNAUTHORIZED)



class Notes_API(Resource):

	@token_required
	def get(self):
		cur = db.connection.cursor()
		cur.execute('''SELECT * FROM note;''')
		data = json.dumps(cur.fetchall())
		db.connection.commit()
		cur.close()
		return Response(data, mimetype="application/json", status=status.HTTP_200_OK)

	@token_required
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
	@token_required
	def get(self,id):
		cur = db.connection.cursor()
		cur.execute(f'''SELECT * FROM note WHERE id = {id};''')
		data = json.dumps(cur.fetchall())

		db.connection.commit()
		cur.close()
		return Response(data, mimetype='application/json', status=status.HTTP_200_OK)

	@token_required
	def put(self,id):

		data = request.form.to_dict()
		new_id = int(data['new_id'])
		cur = db.connection.cursor()
		cur.execute(f'''UPDATE note SET id={new_id} WHERE id = {id};''')

		db.connection.commit()
		cur.close()
		return Response('', status=status.HTTP_200_OK)











