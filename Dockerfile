FROM node:alpine

RUN npm set progress=false && npm config set depth 0 && npm cache clean --force

RUN npm i -g ts-node typescript

RUN mkdir /app

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 9000

CMD [ "ts-node", "index.ts" ]