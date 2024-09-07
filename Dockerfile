FROM node:20-alpine

# update packages
RUN apk update

# create root application folder
WORKDIR /app

# copy configs to /app folder
COPY package*.json ./
COPY tsconfig.json ./
COPY .env ./
# copy source code to /app/src folder
COPY src /app/src

RUN npm install
RUN npm run build

EXPOSE 8000

CMD [ "npm", "start" ]