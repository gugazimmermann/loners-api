FROM node:12.14.1

WORKDIR /app

COPY package.json package.json

RUN npm install --silent

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]