var Game = {};
var testKey,enemyUnit,base,enemybase,unit;
var removeElement;

Game.init = function(){
    game.stage.disableVisibilityChange = true;
};

Game.preload = function() {
    game.load.image('base','assets/sprites/base.png');
    game.load.image('enemy','assets/sprites/enemy.png');
    game.load.image('ally','assets/sprites/ally.png');
};

Game.create = function(){
    Game.playerMap = {};
    testKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    base = game.add.sprite(0, 0, 'base');
    enemybase = game.add.sprite(window.innerWidth-300, 0, 'base');
    unit = game.add.sprite(0, 0, 'ally');
    enemyUnit = game.add.sprite(window.innerWidth-300, 0, 'enemy');
    removeElement = game.add.group();
    
    base.scale.setTo(1, 1);
    enemybase.scale.setTo(1, 1);
    unit.scale.setTo(0.2, 0.2);
    enemyUnit.scale.setTo(0.2, 0.2);
    
    testKey.onDown.add(Client.sendTest, this);
    Client.askNewPlayer();
};

Game.getCoordinates = function(layer,pointer){
    Client.sendClick(pointer.worldX,pointer.worldY);
};

Game.addNewPlayer = function(id,x,y){
    //Game.playerMap[id] = game.add.sprite(x,y,'sprite');
};

Game.movePlayer = function(id,x,y){
    var player = Game.playerMap[id];
    var distance = Phaser.Math.distance(player.x,player.y,x,y);
    var tween = game.add.tween(player);
    var duration = distance*10;
    tween.to({x:x,y:y}, duration);
    tween.start();
};

Game.removePlayer = function(id){
    Game.playerMap[id].destroy();
    delete Game.playerMap[id];
};

Game.update = function(){
    
}

Game.dropHandler = function() {
    if(removeElement.length > 100){
        for(var i=0;i<removeElement.length;i++){
        //  Remove the item from the Group.
        removeElement.remove(removeElement[i]);
        }

    }


}