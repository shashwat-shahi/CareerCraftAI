from flask import Flask
from resume_entity_extraction import extract_details_from_resume
from flask import request, jsonify, session, render_template
import config
import logging
from neo4j import GraphDatabase
from fetch_aspiration_roadmap_data import fetch_roadmap_data_on_aspiration
from skill_gap_analysis import compute_skill_gaps
import json
from flask_cors import CORS
import requests
# import secrets

app = Flask(__name__)
app.config['ENV'] = config.ENV  # or 'production'
# app.secret_key = secrets.token_urlsafe(16)

# Configure CORS to allow access only from specific origins
CORS(app, resources={r"/*": {"origins": ["http://localhost:5173", "https://careercraftai.sarveshsawant.com"]}})

# Neo4J AuraDB credentials
uri = config.NEO4J_URI
username = config.NEO4J_USERNAME
password = config.NEO4J_PASSWORD

# Connect to Neo4j AuraDB
driver = GraphDatabase.driver(uri, auth=(username, password))

# logging
logging.basicConfig(level=logging.INFO)

user_details_json = dict()
all_skills_for_a_role_json = dict()
skill_gaps_json = dict()
user_id = ''

@app.route("/")
def hello():
    return "Hello World!"

@app.route("/extractResumeDetails", methods=['POST', 'GET'])
def extractResumeDetails():
    global user_details_json
    global user_id
    # Get the filename and user id from the request data
    filename = request.form.get('filename')
    user_id = request.form.get('user_id')
    # logging.info("API KEY " + config.API_KEY)
    user_details_json = extract_details_from_resume(filename)
    # session['user_details'] = user_details
    
    # Define the URL of the other endpoint
    if app.config['ENV'] == 'development':
        url = f"http://localhost:8080/user/updateUserSkillset/{user_id}"
    else:
        url = f"https://api.careercraftai.sarveshsawant.com/user/updateUserSkillset/{user_id}"
        
    # Define the headers for the request
    headers = {
        "Content-Type": "application/json"
    }
    # Send a POST request to the other endpoint
    response = requests.post(url, headers=headers, json=user_details_json['skills'])
    
    if response.status_code == 200:
        logging.info("User skillset updated successfully")
    else:
        logging.error("Error updating user skillset")
    
    return jsonify(user_details_json)

@app.route("/fetchSkillGap", methods=['POST', 'GET'])
def fetchSkillGap():
    global user_details_json
    global all_skills_for_a_role_json
    global skill_gaps_json
    global user_id
    all_skills_for_a_role_json = fetch_roadmap_data_on_aspiration(driver, "Springboot developer")
    skill_gaps_json = compute_skill_gaps(all_skills_for_a_role_json, user_details_json)
    return jsonify(skill_gaps_json)


@app.route("/fetchRoadmap", methods=['POST', 'GET'])
def fetchRoadmap():
    global all_skills_for_a_role_json
    global skill_gaps_json
    
    with open('ai/generate_network.html', 'r') as f:
        html = f.read()
    
    data_json = json.dumps(all_skills_for_a_role_json)
    specialData_json = json.dumps(skill_gaps_json)
    # Replace the placeholders with the data and specialData
    html = html.replace('var data = JSON.parse(\'{{ data|tojson|safe }}\');', f'var data = {data_json};')
    html = html.replace('var special_data = JSON.parse(\'{{ specialData|tojson|safe }}\');', f'var special_data = {specialData_json};')
    return html


if __name__ == "__main__":
    # app.run(host='0.0.0.0', port=5000)
    app.run(host='0.0.0.0', port=5000, debug=True)
