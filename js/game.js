var Game = {};
var testKey,enemyUnit,enemybase,unit,lane,spawnLane1Key,spawnLane2Key, base,enemyBase, overlay,canvas,buttonSpawn,currentSprite,enemySprite;
var removeElement, allyGroup, enemyGroup, laneGroup, baseGroup;

var combatMovement ={
    move:0,
    attack:1,
    
}

Game.init = function(){
    game.stage.disableVisibilityChange = true;
};

Game.preload = function() {
    game.load.image('base','assets/sprites/base.png');
    game.load.image('enemybase','assets/sprites/base.png');
    game.load.image('lane','assets/sprites/lane.png');
    
    game.load.image('butter.png','assets/sprites/butter.png');
    game.load.image('cold.png','assets/sprites/cold.png');
    game.load.image('flour.png','assets/sprites/flour.png');
    game.load.image('hot.png','assets/sprites/hot.png');
    game.load.image('Milk.png','assets/sprites/Milk.png');
    game.load.image('oil.png','assets/sprites/oil.png');
    game.load.image('Sugar.png','assets/sprites/Sugar.png');
    game.load.image('water.png','assets/sprites/water.png');
    
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
    
    currentSprite = "butter.png";
    enemySprite = "butter.png";

    
    testKey.onDown.add(Client.sendTest, this);
    spawnLane1Key.onDown.add(Client.spawnLane1, this);
    spawnLane2Key.onDown.add(Client.spawnLane2, this);
    spawnLane3Key.onDown.add(Client.spawnLane3, this);
    
    base.inputEnabled = true;
    base.events.onInputDown.add(listener, this);
    
    overlay = document.querySelector('.b1');
    overlay.addEventListener('click',function(e){
        document.querySelector('.b1-overlay').style.display = "none";
        document.querySelector('.inventory-overlay').style.display = "block";
    });
    
    canvas = document.querySelector('canvas');
    canvas.addEventListener('click',function(e){
        document.querySelector('.b1-overlay').style.display = "block";
        document.querySelector('.inventory-overlay').style.display = "none";
    });
    
    buttonSpawn = document.querySelectorAll('.slot');
    for(var i=0;i<buttonSpawn.length;i++){
        buttonSpawn[i].addEventListener('click',function(e){
        console.dir(this.value);
        currentSprite = this.value;
        Client.setEnemySprite(currentSprite);
        console.log(currentSprite);
    });
    }

    
    
    
    
    Client.askNewPlayer();
};

Game.getCoordinates = function(layer,pointer){
    Client.sendClick(pointer.worldX,pointer.worldY);
};

function listener () {
    
}

Game.addNewPlayer = function(id){
    enemybase = baseGroup.create(window.innerWidth-300, 0, 'enemybase');
    lane = laneGroup.create(10, 20, 'lane');
    lane.scale.setTo(1, 0.8);
    this.world.bringToTop(allyGroup);
    this.world.bringToTop(enemyGroup);
    this.world.bringToTop(baseGroup);
    
    

};

Game.addNewUnit = function(playerNum,x,y){
    if(playerNum == 0){
        unit = allyGroup.create(x, y, currentSprite);
        unit.scale.setTo(0.25, 0.25);
    }
    else{
        enemyUnit = enemyGroup.create(window.innerWidth-x, y, currentSprite);
        enemyUnit.scale.setTo(0.25, 0.25);
    }

};

Game.ChangeUnit = function(spriteName){
    enemySprite = spriteName;
}

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
            
        }else{
            allyGroup.children[i].x += 1;
        }
    }
    for(var i= 0;i<enemyGroup.length;i++){
        //console.log(allyGroup.children[i]);
        if(enemyGroup.children[i].key == 'enemybase'){
            
        }else{
            enemyGroup.children[i].x -= 1;
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