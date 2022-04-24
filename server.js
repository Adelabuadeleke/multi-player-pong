const express = require('express')
const  app = express()

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept, X-Requested-With');
  next();
});

const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "*",
 },
});


const PORT = 3000;

server.listen(PORT);
console.log(`Listening on ${PORT}...`)

let readyPlayerCount = 0;

io.on('connection', (socket)=> {
  console.log('a user connected', socket.id);

  socket.on('ready', ()=>{
    console.log('Player ready', socket.id);
    readyPlayerCount++;

    if (readyPlayerCount === 2) {
      io.emit('startGame', socket.id)
    }
  });

  socket.on('paddleMove', (paddleData) => {
    socket.broadcast.emit('paddleMove', paddleData)
  })

  socket.on('ballMove', (ballData)=>{
    socket.broadcast.emit('ballMove', ballData);
  })
})