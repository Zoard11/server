
FROM node:14.16.0


WORKDIR /usr/src/server


COPY package.json .


RUN npm install --production


COPY . .

EXPOSE 8080

CMD ["node", "index.js"]