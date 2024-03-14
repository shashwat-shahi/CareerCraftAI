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

def create_tech_category_names(session, role_name, tech_category_name):
    create_tech_category_query = """
            CALL apoc.merge.node([$category_name], {name: $category_name, role_name: $role_name})
            YIELD node as category_node
            CALL apoc.create.addLabels(category_node, ['TECHNOLOGY_CATEGORY']) YIELD node
            RETURN node
            """
    category_node = session.run(create_tech_category_query, category_name=tech_category_name, role_name=role_name)
    category_node_id = category_node.single()[0].id
    return category_node_id

def create_relationship_between_category_and_difficulty_level(session, difficulty_level, category_node_id):
    category_and_difficulty_create_query = """
            MATCH (a:Difficulty_Level {name: $difficulty_level}), (b)
            WHERE id(b) = $category_node_id
            MERGE (a)-[r:IMPORTANT_TOPICS]->(b)
            RETURN r
            """
    session.run(category_and_difficulty_create_query, difficulty_level=difficulty_level, category_node_id=category_node_id)
    
def create_skill_node(session, role_name, skill_name, difficulty_level, tech_category_name):
    create_skill_node_query = """
    CALL apoc.merge.node([$category_name], {name: $skill_name, difficulty_level: $difficulty_level, role_name: $role_name})
    YIELD node as skill_node
    CALL apoc.create.addLabels(skill_node, ['SKILLS']) YIELD node
    RETURN node
    """
    result = session.run(create_skill_node_query, category_name=tech_category_name ,skill_name=skill_name, difficulty_level=difficulty_level, role_name=role_name)
    skill_node_id = result.single()[0].id
    return skill_node_id
    
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
    
    # Populate skills and their categories
    for difficulty_level, skill_set in zip(["fundamentals", "intermediate", "advanced"], [fundamentals, intermediate, advanced]):
        for skill_info in skill_set:
            skill_name = skill_info["skill"]
            tech_category_name = skill_info["category"]
            
            # Create or retrieve category name
            tech_category_node_id = create_tech_category_names(session, role_name, tech_category_name)
            
            # Create a relationship between the category node and the difficulty node
            create_relationship_between_category_and_difficulty_level(session, difficulty_level, tech_category_node_id)
            
            # Create the skill node with dynamic label and category_name
            skill_node_id = create_skill_node(session, role_name, skill_name, difficulty_level, tech_category_name)
            
            
            
            
            
            
    
    
    
    
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
