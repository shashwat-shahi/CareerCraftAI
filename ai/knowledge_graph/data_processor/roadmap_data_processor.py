import google.generativeai as genai
import configparser
import json
import os


# Fetch API key from config.ini
config = configparser.ConfigParser()
config.read('ai/config/config.ini')

# Set up the API key
genai.configure(api_key=config['API']['key'])

# Set up the model
generation_config = {
  "temperature": 0.9,
  "top_p": 1,
  "top_k": 1,
  "max_output_tokens": 2048,
}

# Safety settings
safety_settings = [
  {
    "category": "HARM_CATEGORY_HARASSMENT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_HATE_SPEECH",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
]

# Data Directory path
data_dir = "ai/knowledge_graph/data/scraped_raw_data"
processed_data_dir = "ai/knowledge_graph/data/processed_data"

# List all files in the directory
files = os.listdir(data_dir)
processed_files = os.listdir(processed_data_dir)

# Get all Json Files
json_files = [file for file in files if file.endswith('.json')]
processed_files = [file for file in processed_files if file.endswith('.json')]

model = genai.GenerativeModel(model_name="gemini-1.0-pro",
                              generation_config=generation_config,
                              safety_settings=safety_settings)
print(processed_files)

for file in json_files:
  if 'processed_'+file not in processed_files:
      # Read the JSON file
      filename = file
      with open(os.path.join(data_dir, file), 'r') as file:
          data = json.load(file)

      prompt_parts = [f"""input: {data} \nFrom this JSON, create a new json for the role into 3 divisions as required, preferred and desired skills. The structure of the new json will be:
          'Role': 'role_name'
          'required': 'skill': 'skill_name', 'category': 'category_name',
          'preferred': 'skill': 'skill_name', 'category': 'category_name',
          'desired': 'skill': 'skill_name', 'category': 'category_name'
          Avoid giving any redunctant information.""",
        "output: ",
      ]

      response = model.generate_content(prompt_parts)
      print(response.text)
      print(file)

      # Dump the modified data back to the file
      with open(os.path.join(processed_data_dir, "processed_"+filename), 'w') as file:
          json.dump(response.text, file, indent=4)