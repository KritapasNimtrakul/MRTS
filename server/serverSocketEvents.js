var io;
var players = [];

function setupSockets(ioInstance) {
    
    // Gets io instance from server
    io = ioInstance;
    
    // Called when user connects to server
    io.on('connection',function(socket){
        // Whenever a player connects, they join room1
        socket.on('joinRoom',function(){
            console.log("hello");
            var newPlayer = {
                id: socket.id
            };
            
            console.dir(newPlayer);
            players.push(newPlayer);   
            
            console.log(players.length);
            if(players.length < 2){
                
            }else{
                io.emit('newplayer', newPlayer);
            }
            

            
        });
        
        socket.on('spawn',function(data){
            console.log("222");
            var newUnit = {
                playerNum: 100,
                x:0,
                y: data.y
            };
            
            if(players.length < 2){
                
            }else{
                for(var i =0;i<players.length;i++){
                    if(socket.id == players[i].id){
                        newUnit.playerNum = i;
                        if(i == 0){
                            newUnit.x = 300;
                        }
                        else{
                            newUnit.x = 350;
                        }
                        io.emit('spawnUnit', newUnit);
                    }
                }

            }
            

            
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