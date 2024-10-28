from flask import Blueprint

position_blueprint = Blueprint('position', __name__)

from . import routes