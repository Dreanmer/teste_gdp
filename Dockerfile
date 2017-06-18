FROM mhart/alpine-node
WORKDIR /server
ADD . .
EXPOSE 3000
RUN npm install -g nodemon
RUN npm install
CMD ["nodemon", "server.js"]
