from neo4j import GraphDatabase
import configparser
import json
import os
import warnings


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

# Create or retrieve Difficulty_Level nodes
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

# Create or retrieve category name
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

# Create a relationship between the category node and the difficulty node
def create_relationship_between_category_and_difficulty_level(session, difficulty_level, category_node_id, role_name):
    category_and_difficulty_create_query = """
            MATCH (a), (b)
            WHERE id(b) = $category_node_id AND a.name = $difficulty_level AND a.role_name = $role_name
            MERGE (a)-[r:IMPORTANT_TOPICS]->(b)
            RETURN r
            """
    session.run(category_and_difficulty_create_query, difficulty_level=difficulty_level, category_node_id=category_node_id, role_name=role_name)

# Create the skill node with dynamic label and category_name
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

# Create a relationship between the skill node and the category node
def create_relationship_between_skill_and_category(session, skill_node_id, category_node_id):
    skill_category_rel_create_query = """
            MATCH (a), (b)
            WHERE id(a) = $category_node_id AND id(b) = $skill_node_id
            CALL apoc.merge.relationship(a, 'CAN_LEARN', {}, {}, b) YIELD rel
            RETURN rel
            """
    session.run(skill_category_rel_create_query, category_node_id=category_node_id, skill_node_id=skill_node_id)
    
# Populate knowledge graph
def populate_knowledge_graph(driver, json_data):
    
    session = driver.session()
    
    role_name = json_data["Role"]
    fundamentals = json_data.get("fundamentals", [])
    intermediate = json_data.get("intermediate", [])
    advanced = json_data.get("advanced", [])
    
    # Create or retrieve AllRoles - Parent node
    create_parent_node(session)
    
    # Create or retrieve Role node
    create_role_node(session, role_name)
    
    # Create relationship between Role and AllRoles
    create_parent_and_career_option_relationship(session, role_name)
    
    # Create or retrieve Difficulty_Level nodes
    create_technology_category_nodes(session, role_name)
    
    # Populate skills and their categories
    for difficulty_level, skill_set in zip(["fundamentals", "intermediate", "advanced"], [fundamentals, intermediate, advanced]):
        for skill_info in skill_set:
            skill_name = skill_info["skill"]
            tech_category_name = skill_info["category"]
            
            # Create or retrieve category name
            tech_category_node_id = create_tech_category_names(session, role_name, tech_category_name)
            
            # Create a relationship between the category node and the difficulty node
            create_relationship_between_category_and_difficulty_level(session, difficulty_level, tech_category_node_id, role_name)
            
            # Create the skill node with dynamic label and category_name
            skill_node_id = create_skill_node(session, role_name, skill_name, difficulty_level, tech_category_name)
            
            # Create a relationship between the skill node and the category node
            create_relationship_between_skill_and_category(session, skill_node_id, tech_category_node_id)
            
    session.close()


if __name__ == "__main__":
    
    # Read Neo4j AuraDB credentials from config.ini
    config = configparser.ConfigParser()
    config.read('ai/config/config.ini')
    
    # Neo4J AuraDB credentials
    uri = config.get('neo4j', 'uri')
    username = config.get('neo4j', 'username')
    password = config.get('neo4j', 'password')
    
    # Directory to read JSON files from
    data_directory = config.get('data_directory', 'directory_path')
    
    # Connect to Neo4j AuraDB
    driver = GraphDatabase.driver(uri, auth=(username, password))
    
    # Ignore warning messages
    warnings.filterwarnings('ignore')
    
    # Read JSON data
    for filename in os.listdir(data_directory):
        if filename.endswith(".json"):
            print(f"Processing {filename}")
            # Read JSON file
            json_data = read_json_file(filename, data_directory)
    
            # Populate knowledge graph
            populate_knowledge_graph(driver, json_data)

    # Close Neo4j driver
    driver.close()
