var io;
var players = [];

function setupSockets(ioInstance) {
    
    // Gets io instance from server
    io = ioInstance;
    
    // Called when user connects to server
    io.on('connection',function(socket){
        
        // Whenever a player connects, they join room1
        socket.on('joinRoom',function(){
            var newPlayer = {
                id: socket.id
            };
            
            players.push(newPlayer);            
        });
        
        // Called when players disconnect
        socket.on('disconnect',function(){
            for (let i = 0; i < players.length; i++) {
                if (players[i].id === socket.id) { players.splice(i, 1); }
            }
            socket.leave('room1');
        });
        
        // Joins room 1
        socket.join('room1');
    });
}
          
module.exports.setupSockets = setupSockets;