import google.generativeai as genai
import configparser
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

# Get the list of files
def get_files_list(data_dir, processed_data_dir):
    # List all files in the directory
    files = os.listdir(data_dir)
    processed_files = os.listdir(processed_data_dir)

    # Get all Json Files
    json_files = [file for file in files if file.endswith(".json")]
    processed_files = [file for file in processed_files if file.endswith(".json")]
    return json_files, processed_files

# Read and write JSON files
def read_json_file(filename, data_dir):
    with open(os.path.join(data_dir, filename), "r") as file:
        data = json.load(file)
    return data

# Write the JSON file
def write_json_file(filename, data, processed_data_dir):
    with open(os.path.join(processed_data_dir, "processed_" + filename), "w") as file:
        json.dump(data, file, indent=4)

# Fetch the response from the API
def fetch_response_from_api(data, model):
    prompt_parts = [
        f"""input: {data} \nRearrange the skiils in this json and create a new json for the role and divide it into 3 divisions as fundamentals, intermediate and expert skills. The structure of the new json will be:
'Role': 'role_name'
'fundamentals': 'skill': 'skill_name', 'category': 'category_name',
'intermediate': 'skill': 'skill_name', 'category': 'category_name',
'expert': 'skill': 'skill_name', 'category': 'category_name'
The category_name should be generic and uniform for all the jsons I'm about to give you. 
Like same type of skills should have the same category.
Avoid giving any redunctant information.""",
        "output: ",
    ]
    # Fetch the response from the API
    print("Fetching response from the API")
    response = model.generate_content(prompt_parts)
    return response

# Main function
def main():
    # Data Directory paths
    data_dir = "ai/knowledge_graph/data/first_staged_processed_data"
    processed_data_dir = "ai/knowledge_graph/data/second_staged_processed_data"

    # Set up the model
    model = set_model_config()

    # Get the list of files
    json_files, processed_files = get_files_list(data_dir, processed_data_dir)
    file_count = 0
    for file in json_files:
        if "2_" + file not in processed_files:
            print("Processing file: ", file)
            # Read the JSON file
            data = read_json_file(file, data_dir)
            # Fetch the response from the API
            response = fetch_response_from_api(data, model)
            # Write the JSON file
            write_json_file(file, response.text, processed_data_dir)
            file_count += 1
    return f"Processed {file_count} files."


if __name__ == "__main__":
    print(main())
