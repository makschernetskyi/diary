from flask import Blueprint, render_template
# from flask_login import login_required


main = Blueprint('main', __name__)


@main.route('/')
@main.route('/<path:anypath>')
def index(anypath=None):
	return render_template('index.html')