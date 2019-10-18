FROM node:10.16.0
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production
# Bundle the app source
COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]