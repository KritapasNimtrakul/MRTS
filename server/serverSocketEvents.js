var io;
var players = [];
var ready = [];

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
        
        socket.on('ready',function(data){
            ready.push(0);
            
            if(ready.length < 2){
                
            }else{
                io.emit('start');
            }
            

            
        });
        
        socket.on('spawn',function(data){
            
            if(players.length < 2){
                
            }else{
                /*
                for(var i =0;i<players.length;i++){
                    if(socket.id == players[i].id){
                        newUnit.playerNum = i;
                        if(i == 0){
                            newUnit.x = 450;
                        }
                        else{
                            newUnit.x = 500;
                        }
                        socket.emit('spawnUnit', newUnit);
                        socket.broadcast.emit('spawnUnit',newUnit);
                        //io.emit('spawnUnit', newUnit);
                    }
                }*/
                socket.emit('spawnUnit', {
                playerNum: 0,
                x:450,
                y: data.y
            });
                socket.broadcast.emit('spawnUnit',{
                playerNum: 1,
                x:500,
                y: data.y
            });

            }
            

            
        });
        
        socket.on('setEnemy',function(data){
            var unitSprite = {
                playerNum: 100,
                name: data.name
            };
            
            if(players.length < 2){
                
            }else{
                
                for(var i =0;i<players.length;i++){
                    if(socket.id == players[i].id){
                        unitSprite.playerNum = 1;

                        socket.broadcast.emit('ename',unitSprite);
                    }
                }
                
                
               // console.log(unitSprite);
                //socket.to('room1').emit('ename',unitSprite);
                //io.emit('ename',unitSprite);
            }
            

            
        });
        
        // Called when players disconnect
        socket.on('disconnect',function(){
            for (let i = 0; i < players.length; i++) {
                if (players[i].id === socket.id) { players.splice(i, 1); }
            }
            ready.pop();
            socket.leave('room1');
        });
        
        // Joins room 1
        socket.join('room1');
    });
}
          
module.exports.setupSockets = setupSockets;