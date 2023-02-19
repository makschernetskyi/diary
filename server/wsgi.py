from flask import Flask
from flask_mysqldb import MySQL
from flask_cors import CORS
from flask_restful import Api


from database import db, SQL_CONFIG
from routes import initialize_routes





def create_app(config=None):

	#Initialized the app

	app = Flask(__name__, instance_relative_config=True)
	api = Api(app)

	cors = CORS(app, resources=r'/*')

	app.config.update(SQL_CONFIG)

	#Created and initialized the MySQL database

	db.init_app(app)

	#initializing routes to api

	initialize_routes(api)

	@app.route('/')
	def index():
		return 'index page greets you'

	return app
