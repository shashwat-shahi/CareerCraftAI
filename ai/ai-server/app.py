from flask import Flask
from ..resume_entity_extraction import resume_entity_extraction as ree

app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World!"

@app.route("/extractResumeDetails", methods=['POST', 'GET'])
def extractResumeDetails():
    filepath = 'ai/data/extracted_resume_data/SarveshGaurishankar_Sawant_resume.json'
    return ree.extract_details_from_resume(filepath)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5001)