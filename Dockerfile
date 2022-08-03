FROM node:alpine

WORKDIR /backend

EXPOSE 5000

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "start:dev"]
