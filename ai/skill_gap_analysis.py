from neo4j import GraphDatabase
import google.generativeai as genai
import configparser
from nltk.corpus import stopwords
import re
from fetch_aspiration_roadmap_data import fetch_roadmap_data_on_aspiration
from resume_entity_extraction import extract_details_from_resume
import itertools
import time
import json


# Set up the model
def set_model_config():
    # Fetch API key from config.ini
    config = configparser.ConfigParser()
    config.read("ai/config/config.ini")

    # Set up the API key
    genai.configure(api_key=config["API"]["key"])

    # Set up the model
    generation_config = {
        "temperature": 0.9,
        "top_p": 1,
        "top_k": 1,
        "max_output_tokens": 2048,
    }

    # Safety settings
    safety_settings = [
        {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
        {
            "category": "HARM_CATEGORY_HATE_SPEECH",
            "threshold": "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
            "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            "threshold": "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
            "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
            "threshold": "BLOCK_MEDIUM_AND_ABOVE",
        },
    ]

    model = genai.GenerativeModel(
        model_name="gemini-1.0-pro",
        generation_config=generation_config,
        safety_settings=safety_settings,
    )

    return model

# Parse user resume data for extracting skills
def parse_user_resume_data_for_extracting_skills(resume_details_json):
    skills_list = [skill.lower() for skill in resume_details_json['skills']]
    return skills_list

# Parse user resume data for extracting work details
def parse_user_resume_data_for_extracting_work_details(resume_details_json):
    work_detail_string = ''
    if not resume_details_json['work_details']:
        return work_detail_string
    else:
        for details in resume_details_json['work_details']:
            if isinstance(details, dict):
                for key, value in details.items():
                    if isinstance(value, str):
                        work_detail_string += value + ' '
                    elif isinstance(value, list):
                        for item in value:
                            work_detail_string += item + ' '
        return work_detail_string
            
# preprocess work detail string
def preprocess_work_detail_string(work_detail_string):
    # Load english stopwords
    stop_words = set(stopwords.words('english'))
    
    # Remove special characters
    # work_detail_string = re.sub(r'\W', ' ', work_detail_string)
    
    # split string into words
    work_detail_keywords_list = work_detail_string.split(' ')
    
    # Remove stopwords, numbers and empty strings
    work_detail_keywords_list = [word.lower() for word in work_detail_keywords_list if word not in stop_words and not word.isdigit() and word != '']
    
    return work_detail_keywords_list

# Generate all possible triplets from work detail keywords list
def generate_all_possible_triplets(work_detail_keywords_list):
    triplets = list(itertools.combinations(work_detail_keywords_list, 3))
    return triplets

# Compute Skill Gaps
def compute_skill_gaps(all_skills_for_a_role_dict, resume_details_json):
    model = set_model_config()
    prompt = f"{all_skills_for_a_role_dict}\nAbove are all the skills required for the role in the json format. And below is a user's profile. Do a comparision and tell me what all skills are the user missing when compared to the above json and return the missing skills in the form of a json with values as a list of missing skills and keys as fundamentals, intermediate and advanced. All keys should have some values and Put only keys of the above json as values. Don't enclose it within ```\n{resume_details_json}"

    attempt_count = 0

    while attempt_count < 3:
        response = model.generate_content(prompt)
        try:
            # Try to parse the response as JSON
            json.loads(response.text)
            print(response.text)
            # If parsing was successful, break the loop
            break
        except json.JSONDecodeError:
            # If parsing failed, increment the attempt count, wait for 10 seconds and then try again
            attempt_count += 1
            time.sleep(10)

    if attempt_count == 3:
        print("Failed to get a valid JSON response for computing skill gaps after 3 attempts")
        return None
    else:
        return json.loads(response.text)
    

if __name__ == "__main__":
    # Read Neo4j AuraDB credentials from config.ini
    config = configparser.ConfigParser()
    config.read('ai/config/config.ini')
    
    # Neo4J AuraDB credentials
    uri = config.get('neo4j', 'uri')
    username = config.get('neo4j', 'username')
    password = config.get('neo4j', 'password')
    
    # Connect to Neo4j AuraDB
    driver = GraphDatabase.driver(uri, auth=(username, password))
    
    ASPIRATION_NAME = "Springboot developer"
    # ASPIRATION_NAME = "Data Scientist"
    filename = '1707918673455_TejashreeGore_Resume.pdf'
    resume_details_json = extract_details_from_resume(filename)
    all_skills_for_a_role_dict = fetch_roadmap_data_on_aspiration(driver, ASPIRATION_NAME)
    skill_gap_dict = compute_skill_gaps(all_skills_for_a_role_dict, resume_details_json)
    print(skill_gap_dict)
    # print(all_skills_for_a_role_dict)

    driver.session().close()
    driver.close()