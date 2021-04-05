FROM node:12-alpine

WORKDIR /usr/src/app

COPY package.json .

RUN npm install

ADD . /usr/src/app

# RUN npm install -g nodemon
# RUN npm run build


CMD ["npm","run","start"]