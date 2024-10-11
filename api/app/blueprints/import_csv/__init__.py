from flask import Blueprint

import_csv_blueprint = Blueprint('import_csv', __name__)

from . import routes