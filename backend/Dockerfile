# Use official Node.js 18 image
FROM node:14

# Set working directory
WORKDIR /usr/src/app

COPY package.json .
RUN npm install
COPY . .
CMD npm start