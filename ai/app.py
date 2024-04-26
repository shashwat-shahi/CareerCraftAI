from flask import Flask
from resume_entity_extraction import extract_details_from_resume
from flask import request, jsonify
import config
import logging
from flask_cors import CORS

app = Flask(__name__)

# Configure CORS to allow access only from specific origins
CORS(app, resources={r"/*": {"origins": ["http://localhost:5173", "https://careercraftai.sarveshsawant.com"]}})

logging.basicConfig(level=logging.INFO)

@app.route("/")
def hello():
    return "Hello World!"

@app.route("/extractResumeDetails", methods=['POST'])
def extractResumeDetails():
    # Get the filename and user id from the request data
    filename = request.form.get('filename')
    user_id = request.form.get('user_id')
    logging.info("sarvesh filename " + filename)
    logging.info("sarvesh userid " + user_id)
    user_details = extract_details_from_resume(filename)
    
    return jsonify(user_details)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)