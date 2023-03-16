from functools import wraps
from flask import Response, request
from flask_api import status
import jwt

from config import config
from api.database import db


def token_required(f):
	@wraps(f)
	def decorator(*args, **kwargs):

		token = None

		if 'x-access-tokens' in request.headers:
			token = request.headers['x-access-tokens']

		if not token:
			return Response('unauthorized', status=status.HTTP_401_UNAUTHORIZED)

		try:
			token_data = jwt.decode(token, config[SECRET_KEY], algorithms = "HS256")

			cur = db.connection.cursor()
			cur.execute(f'''SELECT id FROM user WHERE id={token_data['public_id']};''')
			raw_data = cur.fetchall()
			data = json.dumps(raw_data)
			db.connection.commit()
			cur.close()
			current_user = ''.join(list(raw_data[0][0]))
		except:
			return Response('unauthorized', status=status.HTTP_401_UNAUTHORIZED)

		return f(current_user, *args, **kwargs)
	return decorator