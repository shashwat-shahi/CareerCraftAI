import boto3
from PyPDF2 import PdfReader
from io import BytesIO
import configparser
import config

def get_aws_credentials():
    # # Read AWS credentials from config.ini
    # config = configparser.ConfigParser()
    # config.read('ai/config/config.ini')
    
    aws_access_key_id = config.AWS_ACCESS_KEY
    aws_secret_access_key = config.AWS_SECRET_KEY
    bucket_name = config.AWS_BUCKET_NAME
    return aws_access_key_id, aws_secret_access_key, bucket_name

def read_pdf_from_s3(file_name):
    aws_access_key_id, aws_secret_access_key, bucket_name = get_aws_credentials()
    s3 = boto3.resource('s3', aws_access_key_id=aws_access_key_id, aws_secret_access_key=aws_secret_access_key)
    obj = s3.Object(bucket_name, file_name)
    pdf_data = obj.get()['Body'].read()


    pdf_file = BytesIO(pdf_data)
    reader = PdfReader(pdf_file)

    extracted_text = ""
    for page in reader.pages:
        extracted_text += page.extract_text()

    return extracted_text