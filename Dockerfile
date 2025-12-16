FROM node:22-alpine

ENV MONGO_URI="mongodb://appuser:appsenha123@mongodb-dev-demo.database.svc.cluster.local:27017/appdb"

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "start:prod"]
