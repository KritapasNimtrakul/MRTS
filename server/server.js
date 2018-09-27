// Imports
var path = require('path');
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
var sockets = require('./serverSocketEvents.js');

// Setup for serving file structure
app.use('/css',express.static(path.resolve(`${__dirname}/../css`)));
app.use('/js',express.static(path.resolve(`${__dirname}/../js`)));
app.use('/assets',express.static(path.resolve(`${__dirname}/../assets`)));

// Serves main page
app.get('/',function(req,res){
    res.sendFile(path.resolve(`${__dirname}/../index.html`));
});

// Sets up all sockets events
sockets.setupSockets(io);

// Listens to port 3000
server.listen(process.env.PORT || 3000,function(err){
    if (err) {
        throw err;
    }
    
    console.log('Listening on '+server.address().port);
});