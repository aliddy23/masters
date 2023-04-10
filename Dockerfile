FROM node:16

WORKDIR /autodeploy
COPY . .
RUN npm install

CMD ["npm", "run", "dev"]