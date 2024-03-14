from neo4j import GraphDatabase
import google.generativeai as genai
import configparser
import json
import os


# Neo4j AuraDB connection URI
uri = "neo4j+s://aa36fcd8.databases.neo4j.io"
username = "neo4j"
password = "j29FcGopBPohDy3Ynkr69TYKcjXP5fLqcW5Ve-c7PO0"

# Read and write JSON files
def read_json_file(filename, data_dir):
    with open(os.path.join(data_dir, filename), "r") as file:
        data = json.load(file)
    return data

if __name__ == "__main__":
    # Read JSON data
    json_data = read_json_file("2_processed_android_developer_roadmap.json", "ai/knowledge_graph/data/second_staged_processed_data")

    # Connect to Neo4j AuraDB
    driver = GraphDatabase.driver(uri, auth=(username, password))
    
    session = driver.session()

    # Close Neo4j driver
    driver.close()
