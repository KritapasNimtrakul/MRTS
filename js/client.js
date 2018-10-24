var Client = {};

Client.socket = io.connect();

Client.sendTest = function(){
    console.log("test sent");
    Client.socket.emit('test');
};
Client.standby = function(){
    Client.socket.emit('ready');
};

Client.spawnLane1 = function(){
    console.log("spawn lane 1");
    Client.socket.emit('spawn',{y:100});
};

Client.spawnLane2 = function(){
    console.log("spawn lane 2");
    Client.socket.emit('spawn',{y:350});
};
Client.setEnemySprite = function(spriteName){
    console.log("XYZ");
    Client.socket.emit('setEnemy',{name:spriteName});
};

Client.spawnLane3 = function(){
    console.log("spawn lane 3");
    Client.socket.emit('spawn',{y:600});
};

Client.askNewPlayer = function(){
    Client.socket.emit('joinRoom');
};

Client.sendClick = function(x,y){
    console.log("x: "+ x  +" y "+ y);
  Client.socket.emit('click',{x:x,y:y});
};

Client.socket.on('newplayer',function(data){
    console.dir(data);
    Game.addNewPlayer(data.id);
});
Client.socket.on('spawnUnit',function(data){
    console.dir(data + "spwn1");
    Game.addNewUnit(data.playerNum,data.x,data.y);
});
Client.socket.on('ename',function(data){
    console.dir(data);
    Game.ChangeUnit(data.name,data.playerNum);
});

Client.socket.on('error', function (err) {
    console.log(err);
});

Client.socket.on('start', function () {
    Game.startResource();
});
