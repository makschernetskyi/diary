from flask import Flask, jsonify, request, Blueprint, Response
from flask_api import status
import json

from database import db


api = Blueprint('api', __name__)

version = '0'



@api.get(f'/api/v{version}/notes')
def get_all_notes():
	cur = db.connection.cursor()
	cur.execute('''SELECT * FROM note;''')
	data = json.dumps(cur.fetchall())
	db.connection.commit()
	cur.close()
	return Response(data, mimetype="application/json", status=status.HTTP_200_OK)

@api.get(f'/api/v{version}/note/<id>')
def get_note(id):

	if not id.isdigit():
		return f"TypeError: id must be an integer, not {type(id).__name__}", 400

	cur = db.connection.cursor()
	cur.execute(f'''SELECT * FROM note WHERE id = {id};''')
	data = json.dumps(cur.fetchall())

	db.connection.commit()
	cur.close()
	return Response(data, mimetype='application/json', status=status.HTTP_200_OK)


@api.post(f'/api/v{version}/note/')
def create_new_note():

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

@api.put(f'/api/v{version}/note/<id>')
def update_note(id):


	if not id.isdigit():
		return f'id must be an integer, not "{type(id).__name__}"', 400

	data = request.form.to_dict()
	new_id = int(data['new_id'])
	cur = db.connection.cursor()
	cur.execute(f'''UPDATE note SET id={new_id} WHERE id = {id};''')

	db.connection.commit()
	cur.close()
	return Response('', status=status.HTTP_200_OK)



