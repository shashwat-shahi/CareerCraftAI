from neo4j import GraphDatabase
import configparser
import json
import os
import warnings
import google.generativeai as genai


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


def fetch_aliases(skill_name, model):
    # Fetch aliases
    prompt = f"Fetch top 5 english aliases of the skill: {skill_name}, except the skill itself and return it as a python list enclosed within []. Don't enclose it withing ```"
    response = model.generate_content(prompt)
    alias_list = response.text.strip().replace("'", "").replace('"', "").replace("[", "").replace("]", "").split(",")
    return alias_list

def fetch_node_names_and_update(driver, model):
    
    session = driver.session()
    
    node_fetching_query = """MATCH (s:SKILLS) WHERE s.aka IS NULL RETURN s.name, ID(s)"""

    node_update_query = """MATCH (n) WHERE ID(n) = $node_id SET n.aka = $alias_list RETURN n"""

    nodes = session.run(node_fetching_query)
    for record in nodes:
        node_id = record["ID(s)"]
        node_name = record["s.name"]
        alias_list = fetch_aliases(node_name, model)
        session.run(node_update_query, node_id=node_id, alias_list=alias_list)
        print(node_id,"-->",node_name,"-->", alias_list)
    session.close()
    
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
    
    # Set up the model
    model = set_model_config()
    
    # Ignore warning messages
    warnings.filterwarnings('ignore')
    
    # fetch_node_names_and_update
    fetch_node_names_and_update(driver, model)
    