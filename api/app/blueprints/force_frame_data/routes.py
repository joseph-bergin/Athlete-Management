from flask import jsonify, request
from . import force_frame_data_blueprint
from app.db import supabase_client

supabase = supabase_client

@force_frame_data_blueprint.route('/force_frame_data', methods=['GET'])
def get_force_frame_data():
    response = supabase.table('forceframedata').select('*').execute()
    force_frame_data = response.data if response.data else []
    return jsonify(force_frame_data), 200

@force_frame_data_blueprint.route('/force_frame_data/<int:data_id>', methods=['GET'])
def get_force_frame_data_by_id(data_id):
    response = supabase.table('forceframedata').select('*').eq('forceFrameDataID', data_id).execute()
    force_frame_data = response.data[0] if response.data else None
    if force_frame_data:
        return jsonify(force_frame_data), 200
    else:
        return jsonify({'error': 'Data not found'}), 404

@force_frame_data_blueprint.route('/force_frame_data/athlete/<int:athlete_id>', methods=['GET'])
def get_force_frame_data_by_athlete_id(athlete_id):
    response = supabase.table('forceframedata').select('*').eq('athleteID', athlete_id).execute()

    if not response.data:
        return jsonify({"error": "No data found for this athlete"}), 404

    return jsonify(response.data), 200

@force_frame_data_blueprint.route('/force_frame_data', methods=['POST'])
def create_force_frame_data():
    new_data = request.json
    response = supabase.table('forceframedata').insert(new_data).execute()
    if response.data:
        return jsonify(response.data[0]), 201
    else:
        return jsonify({'error': 'Failed to create data'}), 400

@force_frame_data_blueprint.route('/force_frame_data/<int:data_id>', methods=['PUT'])
def update_force_frame_data(data_id):
    updated_data = request.json
    response = supabase.table('forceframedata').update(updated_data).eq('id', data_id).execute()
    if response.data:
        return jsonify(response.data[0]), 200
    else:
        return jsonify({'error': 'Failed to update data'}), 400

@force_frame_data_blueprint.route('/force_frame_data/<int:data_id>', methods=['DELETE'])
def delete_force_frame_data(data_id):
    response = supabase.table('forceframedata').delete().eq('id', data_id).execute()
    if response.data:
        return jsonify({'message': 'Data deleted successfully'}), 200
    else:
        return jsonify({'error': 'Failed to delete data'}), 400
