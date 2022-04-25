// const express = require('express')
// const  app = express()

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept, X-Requested-With');
//   next();
// });
const http = require('http')
const io = require('socket.io')
const apiServer = require('./api')
const httpServer = http.createServer(apiServer);
const socketServer = io(httpServer, {
  cors: {
    origin: "*",
 },
});
const sockets = require('./sockets')


const PORT = 3000;

httpServer.listen(PORT);
console.log(`Listening on ${PORT}...`)

sockets.listen(socketServer)


