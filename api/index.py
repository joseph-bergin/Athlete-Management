from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
from db import get_supabase_client

load_dotenv()

app = Flask(__name__)
CORS(app)
# CORS(app, resources={r"/api/*": {"origins": "http://your-frontend-domain.com"}})

supabase = get_supabase_client()

@app.route("/api")
def index():
    response = supabase.table('Admin').select('*').execute()
    print("test")
    return jsonify(response.data)

#----------------- User Table Enpoints -----------------#

# Insert user in user table
@app.route('/users', methods=['POST'])
def create_user():
    data = request.json
    response = supabase.table('User').insert(data).execute()

    if response.data is None:
        return jsonify({'error': 'Failed to create user'}), 400
    
    return jsonify(response.data), 201

# Get all users in table
@app.route('/users', methods=['GET'])
def get_users():
    response = supabase.table('User').select('*').execute()

    if response.data is None:
        return jsonify({'error': 'Failed to fetch users'}), 400
    
    return jsonify(response.data), 200

# Get single user by userID
@app.route('/users/<user_id>', methods=['GET'])
def get_user_by_id(user_id):
    response = supabase.table('User').select('*').eq('userID', user_id).execute()
    
    if response.data is None:
        return jsonify({'error': f'User with id {user_id} not found'}), 404
    
    return jsonify(response.data[0]), 200

# Update single user by userID
@app.route('/users/<user_id>', methods=['PUT'])
def update_user_by_id(user_id):
    data = request.json
    response = supabase.table('User').update(data).eq('userID', user_id).execute()
    
    if response.data is None:
        return jsonify({'error': f'Failed to update user with id {user_id}'}), 400
    
    return jsonify(response.data), 200

# Delete a single user by userID
@app.route('/users/<user_id>', methods=['DELETE'])
def delete_user_by_id(user_id):
    response = supabase.table('User').delete().eq('userID', user_id).execute()
    
    if response.data is None:
        return jsonify({'error': f'Failed to delete user with id {user_id}'}), 400
    
    return jsonify({'message': f'User with id {user_id} successfully deleted'}), 200

#------------------------------------------------------------------------------------------#

#----------------- Team Table Enpoints -----------------#

# Insert team in team table
@app.route('/teams', methods=['POST'])
def create_team():
    data = request.json
    response = supabase.table('Team').insert(data).execute()

    if response.data is None:
        return jsonify({'error': 'Failed to create team'}), 400
    
    return jsonify(response.data), 201

# Get all teams in table
@app.route('/teams', methods=['GET'])
def get_teams():
    response = supabase.table('Team').select('*').execute()

    if response.data is None:
        return jsonify({'error': 'Failed to fetch teams'}), 400
    
    return jsonify(response.data), 200

# Get single team by teamID
@app.route('/teams/<team_id>', methods=['GET'])
def get_team_by_id(team_id):
    response = supabase.table('Team').select('*').eq('teamID', team_id).execute()
    
    if response.data is None:
        return jsonify({'error': f'Team with id {team_id} not found'}), 404
    
    return jsonify(response.data[0]), 200

# Update single team by teamID
@app.route('/teams/<team_id>', methods=['PUT'])
def update_team_by_id(team_id):
    data = request.json
    response = supabase.table('Team').update(data).eq('teamID', team_id).execute()
    
    if response.data is None:
        return jsonify({'error': f'Failed to update team with id {team_id}'}), 400
    
    return jsonify(response.data), 200

# Delete a single team by teamID
@app.route('/teams/<team_id>', methods=['DELETE'])
def delete_team_by_id(team_id):
    response = supabase.table('Team').delete().eq('teamID', team_id).execute()
    
    if response.data is None:
        return jsonify({'error': f'Failed to delete team with id {team_id}'}), 400
    
    return jsonify({'message': f'Team with id {team_id} successfully deleted'}), 200

#------------------------------------------------------------------------------------------#

if __name__ == "__main__":
    app.run(debug=True)
