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

# Create or retrieve AllRoles - Parent node
def create_parent_node(session):
    parent_node_creation_query = "MERGE (a:AllRoles {name: 'Job Roles'})"
    session.run(parent_node_creation_query)

# Create or retrieve Role node
def create_role_node(session, role_name):
    role_node_creation_query = "MERGE (r:Role {role_name: $role_name})"
    session.run(role_node_creation_query, role_name=role_name)

# Create relationship between Role and AllRoles
def create_parent_and_career_option_relationship(session, role_name):
    parent_and_career_option_relationship_query = """
        MATCH (a:AllRoles {name: 'Job Roles'})
        MATCH (r:Role {role_name: $role_name})
        MERGE (a)-[:CAREER_OPTION]->(r)
        """
    session.run(parent_and_career_option_relationship_query, role_name=role_name)

def create_technology_category_nodes(session, role_name):
    for difficulty_level in ["fundamentals", "intermediate", "advanced"]:
        relationship_type = f"for_{difficulty_level}_knowledge"
        session.run("""
            MERGE (c:Difficulty_Level {name: $category_name, role_name: $role_name})
            WITH c
            MATCH (r:Role {role_name: $role_name})
            CALL apoc.merge.relationship(r, $relationship_type, {}, {}, c) YIELD rel
            RETURN rel
            """, category_name=difficulty_level, role_name=role_name, relationship_type=relationship_type)


# populate knowledge graph
def populate_knowledge_graph(driver, json_data):
    
    session = driver.session()
    
    role_name = json_data["Role"]
    fundamentals = json_data.get("fundamentals", [])
    intermediate = json_data.get("intermediate", [])
    advanced = json_data.get("advanced", [])
    
    create_parent_node(session)
    
    create_role_node(session, role_name)
    
    create_parent_and_career_option_relationship(session, role_name)
    
    create_technology_category_nodes(session, role_name)
    
    
    
if __name__ == "__main__":
    # Read JSON data
    json_data = read_json_file("2_processed_android_developer_roadmap.json", "ai/knowledge_graph/data/second_staged_processed_data")

    # Connect to Neo4j AuraDB
    driver = GraphDatabase.driver(uri, auth=(username, password))
    
    # Populate knowledge graph
    populate_knowledge_graph(driver, json_data)
    
    session = driver.session()

    # Close Neo4j driver
    driver.close()
