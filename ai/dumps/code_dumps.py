def compute_skill_gaps_brute_force():
        # for difficulty_level, technology_list in all_skills_for_a_role_dict.items():
        # mapping_flag = False
        # for technology_json in technology_list:
        #     for technology, skill_records in technology_json.items():
        #         print(difficulty_level, '--->', technology, '--->', skill_records, '\n')
        #         if technology not in skills_list or technology not in work_detail_triplets:
        #             for skill_item in skill_records:
        #                 if skill_item['skill'] not in skills_list or skill_item['skill'] not in work_detail_triplets:
        #                     if skill_item['aka']:
        #                         for aka_skill in skill_item['aka']:
        #                             if aka_skill.strip() not in skills_list or aka_skill.strip() not in work_detail_triplets:
        #                                 pass
        #                             else:
        #                                 mapping_flag = True
        #                     else:
        #                         continue
        #                 else:
        #                     mapping_flag = True
        #         else:
        #             mapping_flag = True
        #         if mapping_flag == False:
        #             if difficulty_level == 'Fundamental':
        #                 if fundamental_skill_gap_dict[technology]:
        #                     fundamental_skill_gap_dict[technology].append(skill_item['skill'])
        #                 else:
        #                     fundamental_skill_gap_dict[technology] = [skill_item['skill']]
        #             elif difficulty_level == 'Intermediate':
        #                 if intermediate_skill_gap_dict[technology]:
        #                     intermediate_skill_gap_dict[technology].append(skill_item['skill'])
        #                 else:
        #                     intermediate_skill_gap_dict[technology] = [skill_item['skill']]
        #             elif difficulty_level == 'Advanced':
        #                 if advanced_skill_gap_dict[technology]:
        #                     advanced_skill_gap_dict[technology].append(skill_item['skill'])
        #                 else:
        #                     advanced_skill_gap_dict[technology] = [skill_item['skill']]
        pass


def previous_skill_gap_computation_flow():
            # print(resume_details_json)
    # skills_list = parse_user_resume_data_for_extracting_skills(resume_details_json)
    # work_detail_string = parse_user_resume_data_for_extracting_work_details(resume_details_json)
    # if work_detail_string != '':
    #     work_detail_keywords_list = preprocess_work_detail_string(work_detail_string)
    #     print(work_detail_keywords_list)
    # print(skills_list)
    # skills_list = ['Sql', 'Data analysis', 'CSS', 'Css', 'Github', 'Engineering', 'Analysis', 'LLM', 'System', 'Multimodal ML', 'Docker', 'Ux', 'SQL', 'Airflow', 'Programming', 'Statistical Modeling', 'Reinforcement Learning (RL)', 'Shell', 'Jenkins', 'Python', 'Spark', 'Hadoop', 'AWS', 'Architecture', 'PyTorch', 'HTML', 'Pytorch', 'Nltk', 'Audio', 'Aws', 'Machine learning', 'CI/CD', 'Neo4J', 'C++', 'GitHub actions', 'Tableau', 'Snowflake', 'Version Control (Git)', 'Datasets', 'Relational and Graph Databases', 'Flask', 'Neural Networks', 'Cypher Query Language (CQL)', 'Unix', 'Software engineering', 'Operating systems', 'Opencv', 'Deep learning', 'Segmentation', 'Javascript', 'Numpy', 'Image Processing (OpenCV)', 'TensorFlow', 'Algorithms', 'Azure', 'Research', 'Analytics', 'Html', 'Content', 'Modeling', 'Tensorflow', 'React', 'Spacy', 'Machine Learning (ML)', 'Pandas', 'Acquisition', 'Health', 'Database', 'Design', 'Natural Language Processing (NLP)', 'Filing', 'NoSQL', 'JavaScript', 'Data Analysis', 'Ai', 'Generative AI', 'Deep Learning (DL)', 'Nosql']
    # work_detail_keywords_list = ['software', 'developer', 'ml', 'research', 'innovation', 'tata', 'consultancy', 'services', 'ltd', 'bengaluru', 'india', 'aug', 'aug', 'worked', 'building', 'innovative', 'machine', 'learning', 'solutions', 'solve', 'challenging', 'problem', 'statements', 'invented', 'domain', 'knowledge', 'infused', 'adaptive', 'neuro', 'fuzzy', 'inference', 'system', 'dki', 'anfis', 'architecture', 'assessing', 'welding', 'joint', 'quality', 'images', 'achieving', 'state', 'oftheart', 'accuracy', 'generating', 'revenue', '100k', 'developed', 'priority', 'weighted', 'graph', 'neural', 'networks', 'pw', 'gnn', 'novel', 'architecture', 'fetch', 'semantic', 'search', 'results', 'knowledge', 'graph', 'databases', 'customized', 'domain', 'specific', 'needs', 'accuracy', 'designed', 'module', 'automating', 'prediction', 'icd', 'disease', 'diagnostic', 'codes', 'codes', 'used', 'health', 'insurance', 'companies', 'disbursement', 'patient', 'medical', 'records', 'using', 'nlp', 'techniques', 'neo4j', 'kg', 'accuracy', 'demonstrated', 'exceptional', 'problem', 'solving', 'skills', 'deriving', 'critical', 'insights', 'reduce', 'carbon', 'emissions', 'aspirational', 'net', 'zero', 'emission', 'project']
    # print(resume_details_json)
    # print('-'*50)
    # print('-'*50)
    # print('-'*50)
    # print('-'*50)
    # work_detail_triplets = generate_all_possible_triplets(work_detail_keywords_list)
    pass