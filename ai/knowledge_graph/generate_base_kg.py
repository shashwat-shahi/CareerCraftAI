from neo4j import GraphDatabase
import google.generativeai as genai
import configparser
import json
import os


# Neo4j AuraDB connection URI
uri = "neo4j+s://aa36fcd8.databases.neo4j.io"
username = "neo4j"
password = "j29FcGopBPohDy3Ynkr69TYKcjXP5fLqcW5Ve-c7PO0"


if __name__ == "__main__":

    # Connect to Neo4j AuraDB
    driver = GraphDatabase.driver(uri, auth=(username, password))
    
    session = driver.session()

    # Close Neo4j driver
    driver.close()
