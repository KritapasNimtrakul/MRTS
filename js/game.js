var Game = {};
var testKey,enemyUnit,base,enemybase,unit,lane,spawnLane1Key,spawnLane2Key;
var removeElement, allyGroup, enemyGroup, laneGroup, baseGroup;

Game.init = function(){
    game.stage.disableVisibilityChange = true;
};

Game.preload = function() {
    game.load.image('base','assets/sprites/base.png');
    game.load.image('enemy','assets/sprites/enemy.png');
    game.load.image('ally','assets/sprites/ally.png');
    game.load.image('lane','assets/sprites/lane.png');
    
    game.stage.disableVisibilityChange = true;
};

Game.create = function(){
    Game.playerMap = {};
    testKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    spawnLane1Key = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
    spawnLane2Key = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
    spawnLane3Key = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
    
    removeElement = game.add.group();
    allyGroup = game.add.group();
    enemyGroup = game.add.group();
    laneGroup = game.add.group();
    baseGroup = game.add.group();
    
    base = baseGroup.create(0, 0, 'base');

    
    testKey.onDown.add(Client.sendTest, this);
    spawnLane1Key.onDown.add(Client.spawnLane1, this);
    spawnLane2Key.onDown.add(Client.spawnLane2, this);
    spawnLane3Key.onDown.add(Client.spawnLane3, this);
    Client.askNewPlayer();
};

Game.getCoordinates = function(layer,pointer){
    Client.sendClick(pointer.worldX,pointer.worldY);
};

Game.addNewPlayer = function(id){
    enemybase = baseGroup.create(window.innerWidth-300, 0, 'base');
    lane = laneGroup.create(10, 20, 'lane');
    lane.scale.setTo(1, 0.8);
    this.world.bringToTop(allyGroup);
    this.world.bringToTop(enemyGroup);
    this.world.bringToTop(baseGroup);
    
    

};

Game.addNewUnit = function(playerNum,x,y){
    if(playerNum == 0){
        unit = allyGroup.create(x, y, 'ally');
        unit.scale.setTo(0.25, 0.25);
    }
    else{
        enemyUnit = enemyGroup.create(x, y, 'enemy');
        enemyUnit.scale.setTo(0.25, 0.25);
    }

};

/*Game.movePlayer = function(id,x,y){
    var player = Game.playerMap[id];
    var distance = Phaser.Math.distance(player.x,player.y,x,y);
    var tween = game.add.tween(player);
    var duration = distance*10;
    tween.to({x:x,y:y}, duration);
    tween.start();
};*/

Game.removePlayer = function(id){
    Game.playerMap[id].destroy();
    delete Game.playerMap[id];
};

Game.update = function(){
    for(var i= 0;i<allyGroup.length;i++){
        //console.log(allyGroup.children[i]);
        if(allyGroup.children[i].key == 'base'){
            
        }else if(allyGroup.children[i].key == 'ally'){
            allyGroup.children[i].x += 4;
        }
    }
    for(var i= 0;i<enemyGroup.length;i++){
        //console.log(allyGroup.children[i]);
        if(enemyGroup.children[i].key == 'base'){
            
        }else if(enemyGroup.children[i].key == 'enemy'){
            enemyGroup.children[i].x -= 4;
        }
    }
}

/*Game.dropHandler = function() {
    if(removeElement.length > 100){
        for(var i=0;i<removeElement.length;i++){
        //  Remove the item from the Group.
        removeElement.remove(removeElement[i]);
        }

    }


}*/