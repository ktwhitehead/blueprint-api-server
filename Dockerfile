FROM node:19.9.0
WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install
COPY . .
CMD [ "npm", "run", "start" ]
