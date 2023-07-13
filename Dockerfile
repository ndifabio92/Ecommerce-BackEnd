#FROM --platform=$BUILDPLATFORM node:18.16-alpine3.17
FROM node:18.16-alpine3.17

WORKDIR /app

COPY package.json package-lock.json ./

RUN apk add --no-cache --virtual .gyp python3 make g++

RUN npm install

COPY . .

RUN npm rebuild bcrypt --build-from-source

EXPOSE 8000

CMD ["npm","start"]