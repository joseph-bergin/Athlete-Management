from flask import Blueprint

team_blueprint = Blueprint('team', __name__)

from . import routes