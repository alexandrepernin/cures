# Base Image
FROM python:3
ENV PYTHONUNBUFFERED 1

# Create working directory
WORKDIR /usr/src/app

# Add requirements.txt to working directory
ADD requirements.txt /usr/src/app

# Install requirements
RUN pip install -r requirements.txt

# Add the whole project to the working directory
ADD . /usr/src/app

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .
