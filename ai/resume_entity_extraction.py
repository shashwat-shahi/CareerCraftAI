import google.generativeai as genai
import configparser
from pydparser import ResumeParser
from PyPDF2 import PdfReader
import re
import json
import os
import shutil
from fetch_from_server import get_aws_credentials
import boto3
import time
import config


# Set up the model
def set_model_config():
    # # Fetch API key from config.ini
    # config = configparser.ConfigParser()
    # config.read("ai/config/config.ini")

    # # Set up the API key
    # genai.configure(api_key=config["API"]["key"])

    genai.configure(api_key=config.API_KEY)


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

def get_file_in_temp_dir_from_s3(filename):
    # Create a temporary working directory
    temp_dir = 'temp_dir'
    os.makedirs(temp_dir, exist_ok=True)
    
    # Download the file from S3 to the temporary directory
    local_file_path = os.path.join(temp_dir, filename)
    
    # Get the AWS credentials
    aws_access_key_id, aws_secret_access_key, bucket_name = get_aws_credentials()
    s3 = boto3.resource('s3', aws_access_key_id=aws_access_key_id, aws_secret_access_key=aws_secret_access_key)
    
    # Download the file from S3
    s3.Bucket(bucket_name).download_file(filename, local_file_path)
    
    return local_file_path, temp_dir
    
def extract_details_from_resume_with_ner(local_file_path):
    
    # Extract the details from the resume
    data = ResumeParser(local_file_path).get_extracted_data()
    
    # Return the extracted details
    return data

def extract_details_from_resume_with_bard(preprocessed_text):
    # Set up the model
    model = set_model_config()
    
    # Generate the content
    prompt = f"Extract the skills and work details given in the resume below:\n{preprocessed_text} and return it with two key values: 'skills' and 'work_details' with property values be enclosed in double quotes and the values to these keys should be in form of a list. Don't enclose it withing ```"
    
    attempt_count = 0

    while attempt_count < 3:
        user_json = model.generate_content(prompt)
        try:
            # Try to parse the response as JSON
            json.loads(user_json.text)
            # If parsing was successful, break the loop
            break
        except json.JSONDecodeError:
            # If parsing failed, increment the attempt count, wait for 10 seconds and then try again
            attempt_count += 1
            time.sleep(10)
    
    # If the model fails to generate a valid JSON response after 3 attempts, return None
    if attempt_count == 3:
        print("Failed to get a valid JSON response for extracting resume details after 3 attempts")
        return None
    else:
        return json.loads(user_json.text)

def extract_text_from_PDF(resume_path):
    # Extract text from the PDF
    extracted_text = ""
    reader = PdfReader(resume_path)
    
    for page in reader.pages:
        extracted_text += page.extract_text()
        
    return extracted_text

def preprocess_extracted_text(extracted_text):
    # Remove newlines and extra spaces
    extracted_text = extracted_text.replace("\n", " ").replace("  ", " ")
    extracted_text = re.sub(r'\u2022', '', extracted_text)  # Unicode character for bullet
    extracted_text = re.sub(r'-', '', extracted_text)  # Dash character
    extracted_text = re.sub(r'\*', '', extracted_text)  # Asterisk character
    
    return extracted_text

def process_jsons_for_final_json(resume_details_from_custom_ner, resume_details_from_bard):
    final_json = {}
    final_json['name'] = resume_details_from_custom_ner['name']
    final_json['email'] = resume_details_from_custom_ner['email']
    final_json['mobile_number'] = resume_details_from_custom_ner['mobile_number']
    
    # Extract the "skills" part of the JSON
    skills_list = resume_details_from_bard['skills']
    final_json['skills'] = skills_list
    
    # Similarly for "work_details"
    final_json['work_details'] = resume_details_from_bard['work_details']
    
    # Merge the skills from both the NER and BARD models
    final_json['skills'] = list(set(skills_list).union(set(resume_details_from_custom_ner['skills'])))
    return final_json

def write_json_to_file(final_user_details_json, output_dir_path, filepath):
    # Create the output directory if it doesn't exist
    os.makedirs(output_dir_path, exist_ok=True)
    
    # Extract the filename from the filepath
    filename = os.path.basename(filepath)
    
    # Change the extension from .pdf to .json
    filename = filename.split('.')[0] + '.json'
    
    # Write the final JSON to a file
    with open(os.path.join(output_dir_path, filename), "w") as file:
        json.dump(final_user_details_json, file, indent=4)

# Extract details from the resume
def extract_details_from_resume(filename):
    local_file_path, temp_dir = get_file_in_temp_dir_from_s3(filename)
    extracted_text = extract_text_from_PDF(local_file_path)
    preprocessed_text = preprocess_extracted_text(extracted_text)
    resume_details_from_custom_ner = extract_details_from_resume_with_ner(local_file_path)
    resume_details_from_bard = extract_details_from_resume_with_bard(extracted_text)
    final_user_details_json = process_jsons_for_final_json(resume_details_from_custom_ner, resume_details_from_bard)
    shutil.rmtree(temp_dir)
    return final_user_details_json


if __name__ == "__main__":
    pass
    # output_dir_path = 'ai/resume_entity_recognition/extracted_resume_data/'
    # filename = '1707918673455_TejashreeGore_Resume.pdf'



    # final_user_details_json = extract_details_from_resume(filename)
    # write_json_to_file(final_user_details_json, output_dir_path, filename)
    # print("JSON file written successfully!")