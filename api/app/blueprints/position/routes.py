from flask import jsonify
from . import position_blueprint
from app.db import supabase_client

supabase = supabase_client

@position_blueprint.route('/positions', methods=['GET'])
def get_positions():
    response = supabase.table('Position').select('*').execute()
    positions = response.data if response.data else []
    return jsonify(positions), 200

