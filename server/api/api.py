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
from http.cookies import SimpleCookie

from db import db
from config import config
from models import User, Note, TokenBlacklist


# login_manager = LoginManager()

version = '0'




def token_required(f):
	@wraps(f)
	def decorator(*args, **kwargs):


		token = None


		if  not hasattr(request.headers, 'environ') or not 'HTTP_COOKIE' in dict(request.headers.environ):
			return Response('unauthorized', status=status.HTTP_401_UNAUTHORIZED)

		cookie = SimpleCookie()
		cookie.load(request.headers.environ['HTTP_COOKIE'])
		cookies = {key: val.value for key, val in cookie.items()}



		if 'x-access-tokens' in cookies:
			token = cookies['x-access-tokens']


		if not token:
			return Response('unauthorized', status=status.HTTP_401_UNAUTHORIZED)



		try:

			token_data = jwt.decode(token, config['SECRET_KEY'], algorithms = "HS256")
			try:
				user = db.get_or_404(User, token_data['public_id'])
			except:
				return Response('user not found', status=status.HTTP_404_NOT_FOUND)
		except:
			traceback.print_exc()
			return Response('unauthorized', status=status.HTTP_401_UNAUTHORIZED)

		if TokenBlacklist.query.filter_by(token=token):
			return Response('unauthorized', status=status.HTTP_401_UNAUTHORIZED)

		return f(*args, **kwargs)
	return decorator


class Auth_API(Resource):
	# sign in
	def post(self):

		if not 'password' in request.form or not request.form['password']:
			return Response('incorrect login data', status=status.HTTP_401_UNAUTHORIZED)
		password = request.form['password']
		hash = hashlib.new('sha256')
		hash.update(bytes(password, 'utf-8'))
		password_hash = str(hash.hexdigest())

		user = None
		try:
			user = db.get_or_404(User, 1)
		except:
			return Response('user not found', status=status.HTTP_404_NOT_FOUND)

		if password_hash == user.password_hash:
			#print("hehe got u")
			token = jwt.encode({'public_id': '1', 'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=20)}, config['SECRET_KEY'], algorithm="HS256")
			res = Response('success', status=status.HTTP_200_OK)
			res.set_cookie('x-access-tokens', value=token, httponly=True)
			return res

		return Response('incorrect login data', status=status.HTTP_401_UNAUTHORIZED)

	# sign out
	def put(self):

		token = None


		if  not hasattr(request.headers, 'environ') or not 'HTTP_COOKIE' in dict(request.headers.environ):
			return Response('unauthorized', status=status.HTTP_401_UNAUTHORIZED)

		cookie = SimpleCookie()
		cookie.load(request.headers.environ['HTTP_COOKIE'])
		cookies = {key: val.value for key, val in cookie.items()}



		if 'x-access-tokens' in cookies:
			token = cookies['x-access-tokens']


		if not token:
			return Response('unauthorized', status=status.HTTP_401_UNAUTHORIZED)


		try:
			token_data = jwt.decode(token, config['SECRET_KEY'], algorithms = "HS256")
			try:
				user = db.get_or_404(User, token_data['public_id'])
			except:
				return Response('user not found', status=status.HTTP_404_NOT_FOUND)
			if token_data['exp'] > datetime.datetime.utcnow():
				session = db.session()
				session.add(TokenBlacklist(token))
				session.commit()
		except:
			return Response('server error', status=status.HTTP_500_INTERNAL_SERVER_ERROR)

		res = Response('logged out', status=status.HTTP_200_OK)
		res.delete_cookie('x-access-tokens')
		return res






class Notes_API(Resource):

	@token_required
	def get(self):
		data = None
		notes = None
		try:

			notes = list(map(lambda note: note.__dict__, Note.query.all()))
			for note in notes:
				note.pop('_sa_instance_state')
				note['date'] = str(note['date'])
		except:
			traceback.print_exc()
			return Response('server error', status=status.HTTP_500_INTERNAL_SERVER_ERROR)
		data = json.dumps(notes)
		return Response(data, mimetype="application/json", status=status.HTTP_200_OK)

	@token_required
	def post(self):

		req_data = request.form.to_dict()
		if not "text" in req_data or not "date" in req_data:
			return Response('note not found', status=status.HTTP_400_BAD_REQUEST)
		text = req_data['text']
		date = req_data['date']
		try:
			session = db.session()
			session.add(Note(text,date))
			session.commit()
		except:
			traceback.print_exc()
			return Response('server error', status=status.HTTP_500_INTERNAL_SERVER_ERROR)


		return Response('posted', status=status.HTTP_200_OK)


class Note_API(Resource):
	@token_required
	def get(self,id):
		note = None
		try:
			note = db.get_or_404(Note, id)
		except:
			return Response('note not found', status=status.HTTP_404_NOT_FOUND)
		data = json.dumps(note)
		return Response(data, mimetype="application/json", status=status.HTTP_200_OK)

	@token_required
	def put(self,id):


		req_data = request.form.to_dict()
		if not "text" in req_data or not "date" in req_data:
			return Response('note not found', status=status.HTTP_400_BAD_REQUEST)
		text = req_data['text']
		date = req_data['date']

		try:
			Note.query.filter_by(id=id).update(dict(text=text, date=date))
			db.session.commit()
		except:
			return Response('note not found', status=status.HTTP_404_NOT_FOUND)


		return Response('updated', status=status.HTTP_200_OK)

	@token_required
	def delete(self,id):
		note = None
		try:
			note = db.get_or_404(Note, id)
		except:
			return Response('note not found', status=status.HTTP_404_NOT_FOUND)
		try:
			db.session.delete(note)
			db.session.commit()
		except:
			return Response('server error', status=status.HTTP_500_INTERNAL_SERVER_ERROR)
		return Response('deleted', status=status.HTTP_200_OK)











