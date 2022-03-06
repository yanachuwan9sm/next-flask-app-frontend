FROM node:14.17.4-alpine

WORKDIR /usr/src/app/frontend

# USER gurem

COPY ./package*.json ./

RUN npm install