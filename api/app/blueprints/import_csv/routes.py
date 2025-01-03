from flask import jsonify, request
from . import import_csv_blueprint
from app.db import supabase_client

supabase = supabase_client

def split_name(full_name):
    # Splits the full name into first and last names.
    name_parts = full_name.split(" ")
    first_name = name_parts[0]
    last_name = " ".join(name_parts[1:]) if len(name_parts) > 1 else ""
    return first_name, last_name

def catapult_get_or_create_athlete(athlete_data):
    # Step 1: Split the full name into first_name and last_name
    first_name, last_name = split_name(athlete_data.get("Name"))

    # Step 2: Check if the athlete exists in the athlete table
    response = supabase.table('Athlete').select('*').eq('first_name', first_name).eq('last_name', last_name).eq('teamID', athlete_data["teamID"]).execute()
    if response.data:
        # Athlete exists, return athleteId
        return response.data[0]['athleteID']
    else:
        # Athlete doesn't exist, insert into athlete table
        new_athlete = {"first_name": first_name, "last_name": last_name, "teamID": athlete_data["teamID"], "position_abbreviation": athlete_data["Position Name"]}
        insert_response = supabase.table('Athlete').insert(new_athlete).execute()

        return insert_response.data[0]['athleteID']

def forceframe_get_or_create_athlete(athlete_data):
    # Step 1: Split the full name into first_name and last_name
    first_name, last_name = split_name(athlete_data.get("Name"))

    # Step 2: Check if the athlete exists in the athlete table
    response = supabase.table('Athlete').select('*').eq('first_name', first_name).eq('last_name', last_name).eq('teamID', athlete_data["teamID"]).execute()
    if response.data:
        # Athlete exists, return athleteId
        return response.data[0]['athleteID']
    else:
        # Athlete doesn't exist, insert into athlete table
        new_athlete = {"first_name": first_name, "last_name": last_name, "teamID": athlete_data["teamID"], "position_abbreviation": athlete_data["Position"]}
        insert_response = supabase.table('Athlete').insert(new_athlete).execute()

        return insert_response.data[0]['athleteID']


@import_csv_blueprint.route('/upload_csv', methods=['POST'])
def upload_csv():
    try:
        data = request.json
        if not data:
            return jsonify({"error": "No data received"}), 400

        for entry in data:
            # Step 1: Get or create the athlete in the athlete table
            athlete_id = catapult_get_or_create_athlete(entry)
            # Step 2: Prepare the record to insert into the main table

            # There is an extra space in the excel file for Total High IMA
            record = {
                "athleteID": athlete_id,
                "dataDate": entry["Date"],
                "totalPlayerLoad": entry["Total Player Load"],
                "explosiveYards": entry["Explosive Yardage (Total)"],
                "playerLoadPerMin": entry["Player Load Per Minute"],
                "totalHighIMA": entry["Total  High IMA"],
                "totalDistance": entry["Total Distance (y)"],
                "maximumVelocity": entry["Maximum Velocity (mph)"]
            }

            # Step 3: Insert the record into your main table
            response = supabase.table('catapultdata').insert(record).execute()

        return jsonify({"message": "Data inserted successfully!"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@import_csv_blueprint.route('/upload_force_frame_csv', methods=['POST'])
def upload_force_frame_csv():
    try:
        data = request.json
        if not data:
            return jsonify({"error": "No data received"}), 400

        for entry in data:
            # Step 1: Get or create the athlete in the athlete table
            athlete_id = forceframe_get_or_create_athlete(entry)
            # Step 2: Prepare the record to insert into the main table

            record = {
                "athleteID": athlete_id,
                "dataDate": entry["Date UTC"],
                "dataTime": entry["Time UTC"],
                "deviceName": entry["Device"],
                "mode": entry["Mode"],
                "test": entry["Test"],
                "direction": entry["Direction"],
                "angle": entry["Angle"],
                "leftReps": entry["L Reps"],
                "rightReps": entry["R Reps"],
                "leftMaxForce": entry["L Max Force (N)"],
                "rightMaxForce": entry["R Max Force (N)"],
                "maxImbalance": entry["Max Imbalance"],
                "leftMaxRatio": entry["L Max Ratio"],
                "rightMaxRatio": entry["R Max Ratio"],
                "leftAvgForce": entry["L Avg Force (N)"],
                "rightAvgForce": entry["R Avg Force (N)"],
                "avgImbalance": entry["Avg Imbalance"],
                "leftAvgRatio": entry["L Avg Ratio"],
                "rightAvgRatio": entry["R Avg Ratio"],
                "leftMaxImpulse": entry["L Max Impulse (Ns)"],
                "rightMaxImpulse": entry["R Max Impulse (Ns)"],
                "impulseImbalance": entry["Impulse Imbalance (%)"]
            }

            # Step 3: Insert the record into your main table
            response = supabase.table('forceframedata').insert(record).execute()

        return jsonify({"message": "Data inserted successfully!"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500