FROM python:3
ENV PYTHONUNBUFFERED 1
WORKDIR /usr/src/app/backend
ADD requirements.txt /usr/src/app/backend
RUN pip install -r requirements.txt
ADD . /usr/src/app/backend
COPY . .
EXPOSE 8000
