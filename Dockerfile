FROM node:18
WORKDIR /user/src/app
COPY  package*.json ./
# copy all the files and directories
COPY . .
RUN npm install
EXPOSE 5500
CMD ["node", "index.js"]