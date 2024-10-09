from flask import jsonify, request
from . import user_blueprint
from app.db import supabase_client

supabase = supabase_client

@user_blueprint.route('/users', methods=['GET'])
def get_users():
    response = supabase.table('User').select('*').execute()
    users = response.data if response.data else []
    return jsonify(users), 200

@user_blueprint.route('/users/<auth_id>', methods=['GET'])
def get_user_by_auth_id(auth_id):
    response = supabase.table('User').select('*').eq('authId', auth_id).execute()
    
    if response.data:
        user = response.data[0] 
    else: 
        return jsonify({'error': 'User not found'}), 404
    
    return jsonify(user), 200

@user_blueprint.route('/users', methods=['POST'])
def create_user():
    data = request.json
    response = supabase.table('User').insert(data).execute()
    user = response.data[0] if response.data else {}
    return jsonify(user), 201

@user_blueprint.route('/user', methods=['PUT'])
def update_user_by_id():
    data = request.json
    response = supabase.table('User').update(data).eq('userID', data.userId).execute()
    user = response.data[0] if response.data else {}
    return jsonify(user), 200

@user_blueprint.route('/users/<user_id>', methods=['DELETE'])
def delete_user_by_id(user_id):
    response = supabase.table('User').delete().eq('userID', user_id).execute()
    return jsonify(response.data), 200