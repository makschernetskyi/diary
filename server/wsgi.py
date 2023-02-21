from flask import Flask
from flask_mysqldb import MySQL
from flask_cors import CORS
from flask_restful import Api
from pathlib import Path
import os


from api.database import db, SQL_CONFIG
from routes import initialize_routes

from main.main import main



BASE_DIR = Path(__file__).resolve().parent.parent

TEMPLATE_DIR = os.path.join(BASE_DIR, 'web_client', 'build', 'templates')
STATIC_DIR = os.path.join(BASE_DIR, 'web_client', 'build', 'static')



def create_app(config=None):

	#Initialized the app

	app = Flask(__name__, instance_relative_config=True, template_folder = TEMPLATE_DIR, static_folder = STATIC_DIR)
	api = Api(app)

	print('base_dir', BASE_DIR)

	cors = CORS(app, resources=r'/*')

	app.config.update(SQL_CONFIG)

	#Created and initialized the MySQL database

	db.init_app(app)

	#initializing routes to api

	initialize_routes(api)
	app.register_blueprint(main)

	return app
