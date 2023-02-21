from flask import jsonify, request, Response
from flask_api import status
from flask_restful import Resource
import json

from api.database import db


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

		if not id.isdigit():
			return f"TypeError: id must be an integer, not {type(id).__name__}", 400

		cur = db.connection.cursor()
		cur.execute(f'''SELECT * FROM note WHERE id = {id};''')
		data = json.dumps(cur.fetchall())

		db.connection.commit()
		cur.close()
		return Response(data, mimetype='application/json', status=status.HTTP_200_OK)


	def put(self,id):


		if not id.isdigit():
			return f'id must be an integer, not "{type(id).__name__}"', 400

		data = request.form.to_dict()
		new_id = int(data['new_id'])
		cur = db.connection.cursor()
		cur.execute(f'''UPDATE note SET id={new_id} WHERE id = {id};''')

		db.connection.commit()
		cur.close()
		return Response('', status=status.HTTP_200_OK)



