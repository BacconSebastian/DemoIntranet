FROM node:16-alpine

WORKDIR /app

COPY . /app

RUN npm install

RUN npm i serve

RUN npm i https

EXPOSE 3001

CMD ["npm", "run", "serve"]