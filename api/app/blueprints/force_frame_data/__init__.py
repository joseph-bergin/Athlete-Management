from flask import Blueprint

force_frame_data_blueprint = Blueprint('force_frame_data', __name__)

from . import routes