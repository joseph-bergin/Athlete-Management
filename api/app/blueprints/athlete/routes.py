from flask import jsonify, request
from . import athete_blueprint
from app.db import supabase_client

supabase = supabase_client

@athete_blueprint.route('/athletes', methods=['GET'])
def get_athletes():
    athletes = supabase.table('Athlete').select('*').execute()
    return jsonify(athletes.data), 200

@athete_blueprint.route('/athletes/<int:id>', methods=['GET'])
def get_athlete_by_id(id):
    athlete = supabase.table('Athlete').select('*').eq('athleteID', id).execute()
    if athlete.data:
        return jsonify(athlete.data[0]), 200
    else:
        return jsonify({'error': 'Athlete not found'}), 404

@athete_blueprint.route('/athletes', methods=['POST'])
def create_athlete():
    data = request.get_json()
    athlete = supabase.table('Athlete').insert(data).execute()
    return jsonify(athlete.data[0]), 201

@athete_blueprint.route('/athletes/<int:id>', methods=['PUT'])
def update_athlete(id):
    data = request.get_json()
    athlete = supabase.table('Athlete').update(data).eq('athleteID', id).execute()
    if athlete.data:
        return jsonify(athlete.data[0]), 200
    else:
        return jsonify({'error': 'Athlete not found'}), 404

@athete_blueprint.route('/athletes/<int:id>', methods=['DELETE'])
def delete_athlete(id):
    athlete = supabase.table('Athlete').delete().eq('athleteID', id).execute()
    if athlete.data:
        return jsonify({'message': 'Athlete deleted'}), 200
    else:
        return jsonify({'error': 'Athlete not found'}), 404
