from flask import Blueprint

catapult_data_blueprint = Blueprint('catapult_data', __name__)

from . import routes