from flask import jsonify
from . import team_blueprint
from app.db import supabase_client

supabase = supabase_client

@team_blueprint.route('/teams', methods=['GET'])
def get_teams():
    response = supabase.table('Team').select('*').execute()
    teams = response.data if response.data else []
    return jsonify(teams), 200

@team_blueprint.route('/teams/<team_id>', methods=['GET'])
def get_team_by_id(team_id):
    response = supabase.table('Team').select('*').eq('teamID', team_id).execute()
    team = response.data[0] if response.data else {}
    return jsonify(team), 200

@team_blueprint.route('/teams', methods=['POST'])
def create_team(request):
    data = request.json
    response = supabase.table('Team').insert(data).execute()
    team = response.data[0] if response.data else {}
    return jsonify(team), 201

@team_blueprint.route('/teams', methods=['PUT'])
def update_team_by_id(request):
    data = request.json
    response = supabase.table('Team').update(data).eq('teamID', request.teamId).execute()
    team = response.data[0] if response.data else {}
    return jsonify(team), 200

@team_blueprint.route('/teams/<team_id>', methods=['DELETE'])
def delete_team_by_id(team_id):
    response = supabase.table('Team').delete().eq('teamID', team_id).execute()
    return jsonify(response.data), 200