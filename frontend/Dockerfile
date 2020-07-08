FROM node:10
WORKDIR /usr/src/app/frontend
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
EXPOSE 3000
