from flask import jsonify, request
from . import catapult_data_blueprint
from app.db import supabase_client

supabase = supabase_client

@catapult_data_blueprint.route('/catapult_data', methods=['GET'])
def get_catapult_data():
    response = supabase.table('catapultdata').select('*').execute()
    catapult_data = response.data if response.data else []
    return jsonify(catapult_data), 200

@catapult_data_blueprint.route('/catapult_data/<int:data_id>', methods=['GET'])
def get_catapult_data_by_id(data_id):
    response = supabase.table('catapultdata').select('*').eq('id', data_id).execute()
    catapult_data = response.data[0] if response.data else None
    if catapult_data:
        return jsonify(catapult_data), 200
    else:
        return jsonify({'error': 'Data not found'}), 404

@catapult_data_blueprint.route('/catapult_data', methods=['POST'])
def create_catapult_data():
    new_data = request.json
    response = supabase.table('catapultdata').insert(new_data).execute()
    if response.data:
        return jsonify(response.data[0]), 201
    else:
        return jsonify({'error': 'Failed to create data'}), 400

@catapult_data_blueprint.route('/catapult_data/<int:data_id>', methods=['PUT'])
def update_catapult_data(data_id):
    updated_data = request.json
    response = supabase.table('catapultdata').update(updated_data).eq('id', data_id).execute()
    if response.data:
        return jsonify(response.data[0]), 200
    else:
        return jsonify({'error': 'Failed to update data'}), 400

@catapult_data_blueprint.route('/catapult_data/<int:data_id>', methods=['DELETE'])
def delete_catapult_data(data_id):
    response = supabase.table('catapultdata').delete().eq('id', data_id).execute()
    if response.data:
        return jsonify({'message': 'Data deleted successfully'}), 200
    else:
        return jsonify({'error': 'Failed to delete data'}), 400
