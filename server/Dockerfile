FROM node:17.9.0-alpine

WORKDIR /usr/app

ENV NODE_ENV production

COPY package*.json ./

RUN npm ci --prod --quiet

COPY . .

RUN npm install -g pm2

EXPOSE 3000

CMD ["pm2-runtime", "index.js"]