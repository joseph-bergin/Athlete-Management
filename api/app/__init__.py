from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from app.blueprints.user import user_blueprint
from app.blueprints.team import team_blueprint
from app.blueprints.athlete import athete_blueprint
from app.blueprints.catapult_data import catapult_data_blueprint
from app.blueprints.force_frame_data import force_frame_data_blueprint
from app.blueprints.import_csv import import_csv_blueprint

def create_app():
    load_dotenv()
    
    app = Flask(__name__)
    
    CORS(app)
    
    app.register_blueprint(user_blueprint, url_prefix='/api/ws')
    app.register_blueprint(team_blueprint, url_prefix='/api/ws')
    app.register_blueprint(athete_blueprint, url_prefix='/api/ws')
    app.register_blueprint(catapult_data_blueprint, url_prefix='/api/ws')
    app.register_blueprint(force_frame_data_blueprint, url_prefix='/api/ws')
    app.register_blueprint(import_csv_blueprint, url_prefix='/api/ws')
    
    return app