# Use an official Python runtime as a parent images
FROM python:latest

# Set the working directory to /app
WORKDIR /ai

# Copy the requirements.txt file into the container at /app
COPY requirements.txt /ai

RUN pip install nltk
RUN python -m nltk.downloader stopwords

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the current directory contents into the container at /app
COPY . /ai

# Make port 5000 available to the world outside this container
EXPOSE 5000

# Define environment variable
ENV NAME World

# Run app.py when the container launches
CMD ["python", "app.py"]
