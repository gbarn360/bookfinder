FROM node:18

WORKDIR /index

COPY package*.json ./

RUN npm install
COPY . .

CMD ['npm', 'start']

EXPOSE 5000