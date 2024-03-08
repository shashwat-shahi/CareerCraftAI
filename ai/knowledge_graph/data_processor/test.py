import os

# Path of the target file or directory
target_path = 'ai/config/config.ini'

# Path of the base directory
base_path = 'ai/knowledge_graph/data_processor/roadmap_data_processor.py'

# Calculate the relative path
relative_path = os.path.relpath(target_path, base_path)

print(relative_path)
