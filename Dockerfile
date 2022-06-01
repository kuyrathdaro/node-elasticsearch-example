FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json .
COPY tsconfig.json .
COPY src ./src

RUN npm install
RUN npm install -g pm2
RUN npm run build

EXPOSE 3000
EXPOSE 9200

CMD ["pm2-runtime", "./dist/main.js"]