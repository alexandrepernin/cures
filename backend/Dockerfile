# Base Image
FROM python:3

# Create working directory
WORKDIR /usr/src/app

# Add requirements.txt to working directory
ADD requirements.txt /usr/src/app

# Install requirements
RUN pip install -r requirements.txt

# Add the whole project to the working directory
ADD . /usr/src/app

EXPOSE 8080

CMD [ "python", "manage.py", "migrate"]

CMD [ "python", "manage.py", "runserver"]

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .
