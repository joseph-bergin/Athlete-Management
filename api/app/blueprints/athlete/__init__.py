from flask import Blueprint

athete_blueprint = Blueprint('athlete', __name__)

from . import routes