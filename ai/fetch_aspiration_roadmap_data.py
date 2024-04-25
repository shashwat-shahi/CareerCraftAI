
# Fetch immediate children of an aspiration
def fetch_immediate_children_of_aspiration(driver, aspiration_name):
    difficulty_level_fetching_query = """
        MATCH (n:Role)-[]->(child) WHERE toLower(n.role_name) = toLower($aspiration_name)
    RETURN child, ID(child)
    """
    id_difficulty_dict = dict()
    result = driver.session().run(difficulty_level_fetching_query, aspiration_name=aspiration_name)
    for record in result:
        id_difficulty_dict[record['ID(child)']] = record['child']['name']
    return id_difficulty_dict


# Fetch immediate children of a difficulty level
def fetch_immediate_children_of_difficulty_level(driver, id_difficulty_dict):
    skill_fetching_query = """
    MATCH (n:Difficulty_Level)-[]->(child) WHERE ID(n) = $difficulty_level_id RETURN child, ID(child)"""
    
    difficult_tech_category_dict = dict()
    
    for difficulty_level_id, difficulty_level in id_difficulty_dict.items():
        tech_categories_result = driver.session().run(skill_fetching_query, difficulty_level_id=difficulty_level_id)
        intermediate_tech_category_dict = dict()
        for record in tech_categories_result:
            intermediate_tech_category_dict[record['ID(child)']] = record['child']['name']
        difficult_tech_category_dict[difficulty_level] = intermediate_tech_category_dict
    return difficult_tech_category_dict


# Fetch immediate children of a technology category
def fetch_immediate_children_of_technology_category(driver, difficulty_tech_category_dict):
    all_skills_of_a_tech_category_fetching_query = """
    MATCH (n:TECHNOLOGY_CATEGORY)-[]->(child) WHERE ID(n) = $technology_id and child.difficulty_level = $difficulty_level RETURN child, ID(child)"""
    
    all_skills_for_a_role_dict = dict()
    
    for difficulty_level, tech_category_dict in difficulty_tech_category_dict.items():
        difficulty_level_tech_categories_list = list()
        for node_id, tech_category in tech_category_dict.items():
            intermediate_tech_category_skills_dict = dict()
            skills_result = driver.session().run(all_skills_of_a_tech_category_fetching_query, technology_id=node_id, difficulty_level=difficulty_level)
            list_of_records = list()
            for record in skills_result:
                # record_structure = dict()
                record_structure = list()
                # record_structure['skill'] = record['child']['name']
                record_structure.append(record['child']['name'])
                # if record['child']['aka']:
                #     record_structure['aka'] = record['child']['aka']
                list_of_records = record_structure
            difficulty_level_tech_categories_list.append({tech_category: list_of_records})
        all_skills_for_a_role_dict[difficulty_level] = difficulty_level_tech_categories_list
        
    return all_skills_for_a_role_dict

# Drive roadmap fetching
def fetch_roadmap_data_on_aspiration(driver, aspiration_name):
    id_difficulty_dict = fetch_immediate_children_of_aspiration(driver, aspiration_name)
    difficulty_tech_category_dict = fetch_immediate_children_of_difficulty_level(driver, id_difficulty_dict)
    all_skills_for_a_role_dict = fetch_immediate_children_of_technology_category(driver, difficulty_tech_category_dict)
    return all_skills_for_a_role_dict


# if __name__ == "__main__":
    
#     # Read Neo4j AuraDB credentials from config.ini
#     config = configparser.ConfigParser()
#     config.read('ai/config/config.ini')
    
#     # Neo4J AuraDB credentials
#     uri = config.get('neo4j', 'uri')
#     username = config.get('neo4j', 'username')
#     password = config.get('neo4j', 'password')
    
#     # Connect to Neo4j AuraDB
#     driver = GraphDatabase.driver(uri, auth=(username, password))
    
#     ASPIRATION_NAME = "MLOps"
#     # ASPIRATION_NAME = "Data Scientist"
#     # file_path = 'ai/data/sample_resume_data/SarveshGaurishankar_Sawant_resume.pdf'
#     # resume_details_json = extract_details_from_resume(file_path)
#     # print(resume_details_json)
    
#     # id_difficulty_dict = fetch_immediate_children_of_aspiration(driver, ASPIRATION_NAME)
#     # difficulty_tech_category_dict = fetch_immediate_children_of_difficulty_level(driver, id_difficulty_dict)
#     # all_skills_for_a_role_dict = fetch_immediate_children_of_technology_category(driver, difficulty_tech_category_dict)
#     all_skills_for_a_role_dict = fetch_roadmap_data_on_aspiration(driver, ASPIRATION_NAME)
#     print(all_skills_for_a_role_dict)
#     driver.session().close()
#     driver.close()
    
    
