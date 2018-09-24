let io;
const players = [];

const setupSockets = (ioInstance) => {
  io = ioInstance;
  
  io.sockets.on('connection', (sock) => {
    const socket = sock;
    
    socket.on('joinRoom', () => {
      const newPlayer = {
        id: socket.id
      };
      
      players.push(newPlayer);
      console.log("player has joined");
    });
    
    socket.on('disconnect', () => {
      for (let i = 0; i < players.length; i++) {
        if (players[i].id === socket.id) { players.splice(i, 1); }
      }
      socket.leave('room1');
    });

    socket.join('room1');
  });
};

module.exports.setupSockets = setupSockets;
module.exports.players=  players;