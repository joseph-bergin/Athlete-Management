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

#----------------- CatapultData Table Endpoints -----------------#

# Insert data in CatapultData table
@app.route('/catapultdata', methods=['POST'])
def create_catapult_data():
    data = request.json
    response = supabase.table('CatapultData').insert(data).execute()

    if response.data is None:
        return jsonify({'error': 'Failed to create catapult data'}), 400
    
    return jsonify(response.data), 201

# Get all CatapultData records
@app.route('/catapultdata', methods=['GET'])
def get_catapult_data():
    response = supabase.table('CatapultData').select('*').execute()

    if response.data is None:
        return jsonify({'error': 'Failed to fetch catapult data'}), 400
    
    return jsonify(response.data), 200

# Get single CatapultData record by catapultDataID
@app.route('/catapultdata/<catapultDataID>', methods=['GET'])
def get_catapult_data_by_id(catapultDataID):
    response = supabase.table('CatapultData').select('*').eq('catapultDataID', catapultDataID).execute()
    
    if response.data is None:
        return jsonify({'error': f'Catapult data with id {catapultDataID} not found'}), 404
    
    return jsonify(response.data[0]), 200

# Update single CatapultData record by catapultDataID
@app.route('/catapultdata/<catapultDataID>', methods=['PUT'])
def update_catapult_data_by_id(catapultDataID):
    data = request.json
    response = supabase.table('CatapultData').update(data).eq('catapultDataID', catapultDataID).execute()
    
    if response.data is None:
        return jsonify({'error': f'Failed to update catapult data with id {catapultDataID}'}), 400
    
    return jsonify(response.data), 200

# Delete a single CatapultData record by catapultDataID
@app.route('/catapultdata/<catapultDataID>', methods=['DELETE'])
def delete_catapult_data_by_id(catapultDataID):
    response = supabase.table('CatapultData').delete().eq('catapultDataID', catapultDataID).execute()
    
    if response.data is None:
        return jsonify({'error': f'Failed to delete catapult data with id {catapultDataID}'}), 400
    
    return jsonify({'message': f'Catapult data with id {catapultDataID} successfully deleted'}), 200

#------------------------------------------------------------------------------------------#

#----------------- Athlete Table Endpoints -----------------#

# Insert athlete in Athlete table
@app.route('/athletes', methods=['POST'])
def create_athlete():
    data = request.json
    response = supabase.table('Athlete').insert(data).execute()

    if response.data is None:
        return jsonify({'error': 'Failed to create athlete'}), 400
    
    return jsonify(response.data), 201

# Get all athletes in table
@app.route('/athletes', methods=['GET'])
def get_athletes():
    response = supabase.table('Athlete').select('*').execute()

    if response.data is None:
        return jsonify({'error': 'Failed to fetch athletes'}), 400
    
    return jsonify(response.data), 200

# Get single athlete by athleteID
@app.route('/athletes/<athleteID>', methods=['GET'])
def get_athlete_by_id(athleteID):
    response = supabase.table('Athlete').select('*').eq('athleteID', athleteID).execute()
    
    if response.data is None:
        return jsonify({'error': f'Athlete with id {athleteID} not found'}), 404
    
    return jsonify(response.data[0]), 200

# Update single athlete by athleteID
@app.route('/athletes/<athleteID>', methods=['PUT'])
def update_athlete_by_id(athleteID):
    data = request.json
    response = supabase.table('Athlete').update(data).eq('athleteID', athleteID).execute()
    
    if response.data is None:
        return jsonify({'error': f'Failed to update athlete with id {athleteID}'}), 400
    
    return jsonify(response.data), 200

# Delete a single athlete by athleteID
@app.route('/athletes/<athleteID>', methods=['DELETE'])
def delete_athlete_by_id(athleteID):
    response = supabase.table('Athlete').delete().eq('athleteID', athleteID).execute()
    
    if response.data is None:
        return jsonify({'error': f'Failed to delete athlete with id {athleteID}'}), 400
    
    return jsonify({'message': f'Athlete with id {athleteID} successfully deleted'}), 200

#------------------------------------------------------------------------------------------#

if __name__ == "__main__":
    app.run(debug=True)
