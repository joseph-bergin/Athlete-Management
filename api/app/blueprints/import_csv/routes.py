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

def get_or_create_athlete(athlete_name):
    # Step 1: Split the full name into first_name and last_name
    first_name, last_name = split_name(athlete_name)

    # Step 2: Check if the athlete exists in the athlete table
    response = supabase.table('Athlete').select('*').eq('first_name', first_name).eq('last_name', last_name).execute()
    if response.data:
        # Athlete exists, return athleteId
        return response.data[0]['athleteID']
    else:
        # Athlete doesn't exist, insert into athlete table
        new_athlete = {"first_name": first_name, "last_name": last_name}
        insert_response = supabase.table('Athlete').insert(new_athlete).execute()

        return insert_response.data[0]['athleteID']


@import_csv_blueprint.route('/upload_csv', methods=['POST'])
def upload_csv():
    print("outer test")
    try:
        print("Test")
        data = request.json
        if not data:
            return jsonify({"error": "No data received"}), 400

        for row in data:
            # Step 1: Get or create the athlete in the athlete table
            athlete_name = row.get("Name")
            athlete_id = get_or_create_athlete(athlete_name)
            # Step 2: Prepare the record to insert into the main table

            # There is an extra space in the excel file for Total High IMA
            record = {
                "athleteID": athlete_id,
                # "dataDate": row.get("Date"),
                "totalPlayerLoad": row["Total Player Load"],
                "explosiveYards": row["Explosive Yardage (Total)"],
                "playerLoadPerMin": row["Player Load Per Minute"],
                "totalHighIMA": row["Total  High IMA"],
                "totalDistance": row["Total Distance (y)"],
                "maximumVelocity": row["Maximum Velocity (mph)"]
            }
            print("record done")
            print(record)

            # Step 3: Insert the record into your main table
            response = supabase.table('catapultdata').insert(record).execute()

        return jsonify({"message": "Data inserted successfully!"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500