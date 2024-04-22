import google.generativeai as genai
import configparser
from pydparser import ResumeParser
from PyPDF2 import PdfReader
import re
import json
import os


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

def extract_details_from_resume_with_ner(resume_path):
    data = ResumeParser(resume_path).get_extracted_data()
    return data

def extract_details_from_resume_with_bard(preprocessed_text):
    model = set_model_config()
    prompt = f"Extract the skills and work details given in the resume below:\n{preprocessed_text} and return it with two key values: 'skills' and 'work_details' with property values be enclosed in double quotes and the values to these keys should be in form of a list. Don't enclose it withing ```"
    user_json = model.generate_content(prompt)
    # print("---`user_json`---")
    # print(type(user_json.text))
    # print(str(user_json.text))
    # print("---`user_json ends`---")
    if user_json.text:
        try:
            return json.loads(user_json.text)
        except json.JSONDecodeError:
            print("Invalid JSON string:", user_json.text)
    else:
        print("Empty response text")

    return None

def extract_text_from_PDF(resume_path):
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
              
if __name__ == "__main__":
    filepath = 'ai/resume_entity_recognition/sample_resume_data/SarveshGaurishankar_Sawant_resume.pdf'
    output_dir_path = 'ai/resume_entity_recognition/extracted_resume_data/'
    
    extracted_text = extract_text_from_PDF(filepath)
    preprocessed_text = preprocess_extracted_text(extracted_text)
    resume_details_from_custom_ner = extract_details_from_resume_with_ner(filepath)
    resume_details_from_bard = extract_details_from_resume_with_bard(extracted_text)

    final_user_details_json = process_jsons_for_final_json(resume_details_from_custom_ner, resume_details_from_bard)
    write_json_to_file(final_user_details_json, output_dir_path, filepath)
    print("JSON file written successfully!")