from flask import Flask, jsonify
from dotenv import load_dotenv
import os
from db import get_supabase_client

load_dotenv()

app = Flask(__name__)
app.config['SUPABASE_URL'] = os.getenv('SUPABASE_URL')
app.config['SUPABASE_KEY'] = os.getenv('SUPABASE_KEY')

@app.route("/api/python")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/api")
def index():
    supabase = get_supabase_client()
    response = supabase.table('Admin').select('*').execute()
    print("test")
    return jsonify(response.data)

if __name__ == "__main__":
    app.run(debug=True)
