
FROM node:14.16.0


WORKDIR /usr/src/server


COPY package.json .


RUN npm install --production


COPY . .

EXPOSE 3000

CMD ["node", "index.js"]