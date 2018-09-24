const http = require('http');
const path = require('path');
const express = require('express');
const socketio = require('socket.io');
const sockets = require('./socketServerEvents.js');

const PORT = process.env.PORT || process.env.NODE_PORT || 3000;

const app = express();

app.use('/assets', express.static(path.resolve(`${__dirname}/../hosted/`)));
app.get('/', (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/../hosted/html/index.html`));
});

const server = http.createServer(app);
const io = socketio(server);

sockets.setupSockets(io);

server.listen(PORT, (err) => {
  if (err) {
    throw err;
  }
  console.log(`Listening on port ${PORT}`);
});