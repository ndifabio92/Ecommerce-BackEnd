FROM --platform=$BUILDPLATFORM node:18.16-alpine3.17

WORKDIR /app

COPY .. .

RUN npm install

EXPOSE 8000

CMD ["npm","start"]