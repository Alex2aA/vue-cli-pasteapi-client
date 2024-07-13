FROM node:16

WORKDIR /vue/paste

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8081

CMD ["npm", "run", "serve"]