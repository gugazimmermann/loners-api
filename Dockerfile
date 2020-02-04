FROM node:12.14.1

WORKDIR /app

COPY package.json package.json

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]