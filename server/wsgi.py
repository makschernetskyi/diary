from flask import Flask
from flask_mysqldb import MySQL
from flask_cors import CORS

from api import api, db
from database import db, SQL_CONFIG





def create_app(config=None):

	#Initialized the app

	app = Flask(__name__, instance_relative_config=True)
	cors = CORS(app, resources=r'/*')

	app.config.update(SQL_CONFIG)

	#Created and initialized the MySQL database

	db.init_app(app)

	#registering a blueprint

	app.register_blueprint(api)

	@app.route('/')
	def index():
		return 'index page greets you'

	return app
