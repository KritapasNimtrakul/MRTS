var Game = {};
var Lobby = {};
var Over = {};

var testKey,player2base,spawnLane1Key,spawnLane2Key, player1base, overlay,canvas,buttonSpawn, resourceUI;
var playerN;
var removeElement, player1Group, player2Group, laneGroup,chefGroup;
var playerSprite;
let player1unit,player2unit;
var player1CollisionGroup,player2CollisionGroup;
var timer;
var background;
var gameText;
var key;
var selectLane,lane1,lane2,lane3, activeLane,p1Point,p2Point;
var combatMovement ={
    move:0,
    move:0,
    attack:1,
}
var chef1,chef2,chef3,chef4,chef5,chef6;
var chef = [],enemyChef = [];
var cost = {
    butter:"1,butter",
    flour:"1,flour",
    sugar:"1,sugar",
    oil:"1,oil",
    milk:"1,milk",
    water:"1,water",
    heat:"1,heat",
    cold:"1,cold",
    cracker:"1,flour,1,oil,1,glass",
    bread:"1,flour,1,water,1,oil,1,heat,1,glass",
    lavaCake:"1,heat,1,butter,1,sugar,1,glass",
    cupCake:"1,flour,1,milk,1,sugar,1,butter,1,glass",
    monstrosity:"1,butter,1,flour,1,sugar,1,oil,1,milk,1,water,1,heat,1,cold,1,glass",
    iceWater:"1,water,1,cold,1,glass",
    milkTea:"1,water,1,heat,1,milk,1,glass",
    butterMilk:"1,milk,1,butter,1,cold,1,glass",
}

var resource = {
    butter:0,
    flour:0,
    sugar:0,
    oil:0,
    milk:0,
    water:0,
    heat:0,
    cold:0,
    glass:2,
}

var combat = {
    waitTime:0.5,
    attackDmg:1,
    health:20,
    range:1,
    speed:1,
    cost: ['b'],
    decision:combatMovement.move,
}

Game.init = function(){
    //game.stage.disableVisibilityChange = true;
    playerSprite = ["butter.png","butter.png"];
  
};

var sugarSprite;

Game.preload = function() {
    
    game.load.image('chef','assets/sprites/Chef.png');
    game.load.image('player1base','assets/sprites/base.png');
    game.load.image('player2base','assets/sprites/base.png');
    game.load.image('background','assets/sprites/background.png');
    
    game.load.image('healthBar', 'assets/sprites/healthBar.png');
  
    game.load.image('lane1','assets/sprites/topTable.png');
    game.load.image('lane2','assets/sprites/middleTable.png');
    game.load.image('lane3','assets/sprites/bottomTable.png');
    game.load.image('lane','assets/sprites/table.png');
    
    game.load.image('butter.png','assets/sprites/butter.png');
    game.load.image('cold.png','assets/sprites/cold.png');
    game.load.image('flour.png','assets/sprites/flour.png');
    game.load.image('heat.png','assets/sprites/heat.png');
    game.load.image('milk.png','assets/sprites/milk.png');
    game.load.image('oil.png','assets/sprites/oil.png');
    game.load.image('sugar.png','assets/sprites/sugar.png');
    game.load.image('water.png','assets/sprites/water.png');
    
    game.load.image('cracker.png','assets/sprites/cracker.png');
    game.load.image('bread.png','assets/sprites/bread.png');
    game.load.image('lavaCake.png','assets/sprites/lavaCake.png');
    game.load.image('cupCake.png','assets/sprites/cupCake.png');
    game.load.image('monstrosity.png','assets/sprites/monstrosity.png');
    game.load.image('iceWater.png','assets/sprites/iceWater.png');
    game.load.image('milkTea.png','assets/sprites/milkTea.png');
    game.load.image('butterMilk.png','assets/sprites/butterMilk.png');
  
    game.load.image('sugar0', 'assets/animations/sugarAttack/sugarAttack00.png');
    game.load.image('sugar1', 'assets/animations/sugarAttack/sugarAttack01.png');
    game.load.image('sugar2', 'assets/animations/sugarAttack/sugarAttack02.png');
    game.load.image('sugar3', 'assets/animations/sugarAttack/sugarAttack03.png');
    game.load.image('sugar4', 'assets/animations/sugarAttack/sugarAttack04.png');
    game.load.image('sugar5', 'assets/animations/sugarAttack/sugarAttack05.png');
    game.load.image('sugar6', 'assets/animations/sugarAttack/sugarAttack06.png');
    game.load.image('sugar7', 'assets/animations/sugarAttack/sugarAttack07.png');
    game.load.image('sugar8', 'assets/animations/sugarAttack/sugarAttack08.png');
    game.load.image('sugar9', 'assets/animations/sugarAttack/sugarAttack09.png');
    game.load.image('sugar10', 'assets/animations/sugarAttack/sugarAttack10.png');
    game.load.image('sugar11', 'assets/animations/sugarAttack/sugarAttack11.png');
    game.load.image('sugar12', 'assets/animations/sugarAttack/sugarAttack12.png');
    game.load.image('sugar13', 'assets/animations/sugarAttack/sugarAttack13.png');
    game.load.image('sugar14', 'assets/animations/sugarAttack/sugarAttack14.png');
  
    game.stage.disableVisibilityChange = true;
};

Game.create = function(){
  
    key = Object.keys(resource);
  
    game.physics.startSystem(Phaser.Physics.P2JS);
  
    game.physics.p2.setImpactEvents(true);
  
    game.physics.p2.gravity.y = 0;
    playerN = 0;
    selectLane = [];
    p1Point = 0;
    p2Point = 0;
    //chef = {0:1,1:1,2:1};
    //enemyChef = {0:1,1:1,2:1};
    
    glowFilter=new Phaser.Filter.Glow(game);
    
    activeLane = {0:1,1:1,2:1};
  
    Game.playerMap = {};
    testKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    //spawnLane1Key = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
    //spawnLane2Key = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
    //spawnLane3Key = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
  
  
    /*
    //console.dir(sugarSprite);
  
    sugarSprite.animations.create({
      key: 'sugarAttack',
      frames: [
        { key: 'sugar0', frame: null},
        { key: 'sugar1', frame: null},
        { key: 'sugar2', frame: null},
        { key: 'sugar3', frame: null},
        { key: 'sugar4', frame: null},
        { key: 'sugar5', frame: null},
        { key: 'sugar6', frame: null},
        { key: 'sugar7', frame: null},
        { key: 'sugar8', frame: null},
        { key: 'sugar9', frame: null},
        { key: 'sugar10', frame: null},
        { key: 'sugar11', frame: null},
        { key: 'sugar12', frame: null},
        { key: 'sugar13', frame: null},
        { key: 'sugar14', frame: null},
      ],
      frameRate: 8,
      repeat: -1
    });
    */
  
    removeElement = game.add.group();
    player1Group = game.add.group();
    player2group = game.add.group();
    laneGroup = game.add.group();
    chefGroup = game.add.group();
    
    
  
    laneGroup.inputEnableChildren = true;
    
    background = laneGroup.create(0, 0, 'background');
    background.scale.setTo(window.innerWidth/3000, window.innerHeight/1500);
    background.events.onInputDown.add(changeSpawnLane, this,0,100);
    
    chef1 = chefGroup.create(window.innerWidth*0.2, window.innerHeight*0.25, 'chef');
    chef2 = chefGroup.create(window.innerWidth*0.2, window.innerHeight*0.52, 'chef');
    chef3 = chefGroup.create(window.innerWidth*0.2, window.innerHeight*0.80, 'chef');
    chef4 = chefGroup.create(window.innerWidth*0.8, window.innerHeight*0.25, 'chef');
    chef5 = chefGroup.create(window.innerWidth*0.8, window.innerHeight*0.52, 'chef');
    chef6 = chefGroup.create(window.innerWidth*0.8, window.innerHeight*0.80, 'chef');
    
    chef.push(chef1);
    chef.push(chef2);
    chef.push(chef3);
    enemyChef.push(chef4);
    enemyChef.push(chef5);
    enemyChef.push(chef6);
    

    
    player1base = player1Group.create(window.innerWidth*0.08, window.innerHeight*0.6, 'player1base');
    player1base.combat = {...stats.base, decision:0  };
    player1base.resource = {...resource,
    butter:3,
    flour:3,
    sugar:3,
    oil:3,
    milk:3,
    water:3,
    heat:3,
    cold:3,
    glass:2,
};
    player2base = player2group.create(window.innerWidth*0.9, window.innerHeight*0.6, 'player2base');
    player2base.combat = {...stats.base, decision:0  };
    player2base.resource = {...resource,
    butter:3,
    flour:3,
    sugar:3,
    oil:3,
    milk:3,
    water:3,
    heat:3,
    cold:3,
    glass:2,
};
    player1base.scale.setTo(window.innerWidth/190*0.2, window.innerHeight/493*0.75);
    player2base.scale.setTo(window.innerWidth/190*0.2, window.innerHeight/493*0.75);
    testKey.onDown.add(Client.sendTest, this);
    
    player1base.inputEnabled = true;
    player1base.canSpawn = true;
    player1base.events.onInputDown.add(listener, this);
  
    player2base.canSpawn = true;
  
    game.physics.p2.enable( [ player1base, player2base ]);
  
    player1base.body.static = true;
    player2base.body.static = true;
  
    var basebar1 = game.make.sprite(-player1base.texture.width / 2.7, -player1base.texture.height / 1.8, 'healthBar');
    basebar1.enablebody = false;
    basebar1.scale.setTo(1.4, 1.4);
    player1base.addChild(basebar1);
  
    var basebar2 = game.make.sprite(-player2base.texture.width / 2.7, -player2base.texture.height / 1.8, 'healthBar');
    basebar2.static = true;
    basebar2.scale.setTo(1.4, 1.4);
    player2base.addChild(basebar2);
    
    player1CollisionGroup = game.physics.p2.createCollisionGroup();
    player2CollisionGroup = game.physics.p2.createCollisionGroup();
    
    player1base.body.setCollisionGroup(player1CollisionGroup);
    player2base.body.setCollisionGroup(player2CollisionGroup);
    
    player1base.body.collides([player1CollisionGroup, player2CollisionGroup]);
    player2base.body.collides([player1CollisionGroup, player2CollisionGroup]);
    
        for(var i =0; i<chef.length;i++){
        chef[i].combat = {...stats.base, decision:0};
        chef[i].scale.setTo(0.2, 0.2);
        game.physics.p2.enable(chef[i]);
        chef[i].enableBody = true;
        chef[i].physicsBodyType = Phaser.Physics.P2JS;
        chef[i].body.setCollisionGroup(player1CollisionGroup);
        chef[i].body.collides(player2CollisionGroup, hitUnit, this);
        chef[i].body.static = true;
        
    }
        
    
    for(var i =0; i<enemyChef.length;i++){
        enemyChef[i].combat = {...stats.base, decision:0};
        
        game.physics.p2.enable(enemyChef[i]);
        enemyChef[i].enableBody = true;
        enemyChef[i].physicsBodyType = Phaser.Physics.P2JS;
        enemyChef[i].body.setCollisionGroup(player2CollisionGroup);
        enemyChef[i].body.collides(player1CollisionGroup, hitUnit, this);
        enemyChef[i].scale.setTo(-0.2, 0.2);
        enemyChef[i].body.static = true;
    }
    
    
    
    
    overlay = document.querySelector('.b1');
    overlay.addEventListener('click',function(e){
        document.querySelector('.b1-overlay').style.display = "none";
        document.querySelector('.inventory-overlay').style.display = "block";
        document.querySelector('.special-overlay').style.display = "none";

    });
    
    overlay2 = document.querySelector('.b2');
    overlay2.addEventListener('click',function(e){
        document.querySelector('.b1-overlay').style.display = "none";
        document.querySelector('.inventory-overlay').style.display = "none";
        document.querySelector('.special-overlay').style.display = "block";

    });
    /*
    canvas = document.querySelector('canvas');
    canvas.addEventListener('click',function(e){
        document.querySelector('.b1-overlay').style.display = "block";
        document.querySelector('.inventory-overlay').style.display = "none";
        document.querySelector('.special-overlay').style.display = "none";
    });
    */
    
    backBtn = document.querySelectorAll('.backBtn');
    backBtn.forEach(function(btn) {
        
    btn.addEventListener('click',function(e){
        document.querySelector('.b1-overlay').style.display = "block";
        document.querySelector('.inventory-overlay').style.display = "none";
        document.querySelector('.special-overlay').style.display = "none";

    });
    });
    
    buttonSpawn = document.querySelectorAll('.slot');
    resourceUI = document.querySelectorAll('.reSlot');
    for(var i=0;i<buttonSpawn.length;i++){
        
        buttonSpawn[i].addEventListener('click',function(e){
          
        if(this.value == "glass.png"){
            
        }else{
            if(player1base.combat.health > 0 && player2base.combat.health > 0){
                lane1.tint = 0x279AD4;
                lane1.filters=[glowFilter];
                lane2.tint = 0x279AD4;
                lane2.filters=[glowFilter];
                lane3.tint = 0x279AD4;
                lane3.filters=[glowFilter];
            }
            selectLane.push(this.value.slice(0, -4));
            if(selectLane.length > 2){
                selectLane.shift();
            }
            
            var statusWindow  = document.querySelector(".stats");
            statusWindow.removeChild(statusWindow.firstChild);
            var div = document.createElement('div');
            var img = document.createElement('img');
            img.classList.add("imgStats");
            img.src = "../assets/sprites/"+this.value.slice(0, -4) + "_Stats.png";
            div.appendChild(img);
            statusWindow.appendChild(div);
            playerSprite[0] = this.value;
            Client.setEnemySprite(this.value);

        }
    });
    }
    
    //timer.loop(1000, updateTextResource, this, player1base);
    
    Client.askNewPlayer();
};

Game.getCoordinates = function(layer,pointer){
    Client.sendClick(pointer.worldX,pointer.worldY);
};

function listener () {
    
}

function updateResource() {
        if(p1Point <= 2 || p2Point <= 2){
                    for(var i =0;i<key.length-1;i++){
        player1base.resource[key[i]] += 1;
        player2base.resource[key[i]] += 1;
                }
        }


}
function updateGlass() {
    
        if(p1Point <= 2 || p2Point <= 2){
                    for(var i =0;i<key.length-1;i++){
        player1base.resource.glass += 1;
        player2base.resource.glass += 1;
                }
        }

    

}
function updateTextResource() {
            for(var i=0;i<buttonSpawn.length;i++){
            buttonSpawn[i].childNodes[1].textContent = player1base.resource[buttonSpawn[i].value.slice(0, -4)];
    }
                for(var i=0;i<resourceUI.length;i++){
            resourceUI[i].childNodes[1].textContent = player1base.resource[resourceUI[i].value.slice(0, -4)];
    }
    
    /*
            for(var i=0;i<buttonSpawn.length;i++){
            buttonSpawn[i].childNodes[1].textContent = player2base.resource[buttonSpawn[i].value.slice(0, -4)];
    }
    */
    timer.add(1000, updateTextResource, this);

    

}

Game.p2Resource = function(numplayer){
    ////// send to client and make it player2
    
    playerN = numplayer;

};
Game.conclude = function(player){
    ////// send to client and make it player2
    
    if(player === "p1"){
        gameText = game.add.text(window.innerWidth/2, window.innerHeight, 'You Win', { font: '24px Arial', fill: '#fff' });
    }else{
        gameText = game.add.text(window.innerWidth/2, window.innerHeight, 'You Lose', { font: '24px Arial', fill: '#fff' });
    }
            
    game.paused = true;

};

Game.addNewPlayer = function(id){
    ////console.log(id);
    //lane = laneGroup.create(0, 0, 'lane');
    
    
    lane1 = laneGroup.create(window.innerWidth/4,window.innerHeight*0.25, 'lane');
    lane1.events.onInputDown.add(changeSpawnLane, this,0,0);
    lane2 = laneGroup.create(window.innerWidth/4, window.innerHeight*0.52, 'lane');
    lane2.events.onInputDown.add(changeSpawnLane,this,0,1);
    lane3 = laneGroup.create(window.innerWidth/4, window.innerHeight*0.80, 'lane');
    lane3.events.onInputDown.add(changeSpawnLane, this,0,2);
    
    
    
    //var x = 2960/window.innerWidth;
    //var y = 1440/window.innerHeight;
    //////console.dir(lane);
    //lane.scale.setTo()
    
    lane1.scale.setTo(window.innerWidth/4000, window.innerHeight/1500);
    lane2.scale.setTo(window.innerWidth/4000, window.innerHeight/1500);
    lane3.scale.setTo(window.innerWidth/4000, window.innerHeight/1500);
    //lane.scale.setTo(window.innerWidth/2960, window.innerHeight/1440);
    this.world.bringToTop(player1Group);
    this.world.bringToTop(player2group);
    this.world.bringToTop(chefGroup);
    
    Client.standby();


};

Game.startResource = function(id){
    
    timer = game.time.create(false);

    //  Set a TimerEvent to occur after 2 seconds
    setTimeout(function() { timerCall(); }, 3000);


};

function changeSpawnLane(o,x,laneNum) {
    //console.log(laneNum);
    //console.log(o);
    //console.log(x);
    
    if(document.querySelector('.b1-overlay').style.display == "none"){
        selectLane.push(laneNum);
        if(selectLane.length > 2){
            selectLane.shift();
        }
    }else{
    }
    switch(isNaN(selectLane[0]) || parseInt(selectLane[0])){
        case true: //lane1.loadTexture('');
            switch(selectLane[1]){
                case 0:
                    if(player1base.combat.health > 0 && player2base.combat.health > 0){
                        Client.spawnLane1();
                    }
                    break;
                case 1:
                    if(player1base.combat.health > 0 && player2base.combat.health > 0){
                        Client.spawnLane2();
                    }
                    break;
                case 2:
                    if(player1base.combat.health > 0 && player2base.combat.health > 0){
                        Client.spawnLane3();
                    }

                    break;
                default:

                    break;
            }
            break;
        default:
            break;

    }
    lane1.filters=null;
    lane2.filters=null;
    lane3.filters=null;
    lane1.tint = 0xffffff;
    lane2.tint = 0xffffff;
    lane3.tint = 0xffffff;
    

}

function timerCall() {

    // How often you get ingredients (in milliseconds)
    timer.loop(20000, updateResource, this);
    //timer.loop(20000, updateResource, this);
    //How often you get glass (in milliseconds)
    timer.loop(15000, updateGlass, this);
    // How often the resources are visually updated
    timer.add(1000, updateTextResource, this);
    timer.start();
    

}


Game.addNewUnit = function(playerNum,x,y){
    
  
    if (playerNum == 0) {
      if (player1base.canSpawn) {
        setTimeout(function() { stopSpawn(player1base); }, 1000);
        player1base.canSpawn = false;
      } else {
        return;
      }
    } else {
      if (player2base.canSpawn) {
        setTimeout(function() { stopSpawn(player2base); }, 1000);
        player2base.canSpawn = false;
      } else {
        return;
      }
    }
  
    var costStr = cost[playerSprite[playerNum].slice(0, -4)];
    var tempStorage = costStr.split(",");
    var resourceValues = {...resource, glass:0};
    //////console.log(player1base.resource[key[0]]);

    for(var i =0;i<tempStorage.length;i++){
        if (i % 2 == 1) {
            resourceValues[tempStorage[i]] = tempStorage[i-1];

            //resourceTypes.push(tempStorage[i]);
        }
    }
    
    if(playerNum == 0){

        for(var i =0;i<key.length;i++){
            if(player1base.resource[key[i]] >= resourceValues[key[i]] ){
                
            }else{
                //console.log(player1base.resource[key[i]]);
                return;
        }
        if(i== key.length-1 && player1base.resource[key[i]] >= resourceValues[key[i]]){
            for(var j =0;j<key.length;j++){
                player1base.resource[key[j]] -= resourceValues[key[j]];
            }
            
        player1unit = player1Group.create(x, y, playerSprite[0]);
        switch(playerSprite[0]){
            case "butter.png": 
                player1unit.combat = {...stats.butter, decision:0, laneSpawn:5  };
                break;
            case "flour.png": 
                player1unit.combat = {...stats.flour, decision:0, laneSpawn:5   };
                break;
            case "sugar.png": 
                player1unit.combat = {...stats.sugar, decision:0, laneSpawn:5   };
                break;
            case "oil.png": 
                player1unit.combat = {...stats.oil, decision:0, laneSpawn:5   };
                break;
            case "milk.png": 
                player1unit.combat = {...stats.milk, decision:0, laneSpawn:5   };
                break;
            case "water.png": 
                player1unit.combat = {...stats.water, decision:0, laneSpawn:5   };
                break;
            case "heat.png": 
                player1unit.combat = {...stats.heat, decision:0, laneSpawn:5   };
                break;
            case "cold.png": 
                player1unit.combat = {...stats.cold, decision:0, laneSpawn:5   };
                break;
            case "cracker.png": 
                player1unit.combat = {...stats.cracker, decision:0, laneSpawn:5   };
                break;
            case "lavaCake.png": 
                player1unit.combat = {...stats.lavaCake, decision:0, laneSpawn:5   };
                break;
            case "cupCake.png": 
                player1unit.combat = {...stats.cupCake, decision:0, laneSpawn:5   };
                break;
            case "monstrosity.png": 
                player1unit.combat = {...stats.monstrosity, decision:0, laneSpawn:5   };
                break;
            case "iceWater.png": 
                player1unit.combat = {...stats.iceWater, decision:0, laneSpawn:5   };
                break;
            case "milkTea.png": 
                player1unit.combat = {...stats.milkTea, decision:0, laneSpawn:5   };
                break;
            case "butterMilk.png": 
                player1unit.combat = {...stats.butterMilk, decision:0, laneSpawn:5   };
                break;
            case "bread.png": 
                player1unit.combat = {...stats.bread, decision:0, laneSpawn:5   };
                break;
            default:
                player1unit.combat = {...combat};
                break;
        }
            
        switch(y){
            case window.innerHeight*0.25:
                player1unit.combat.laneSpawn = 0;
                break;
            case window.innerHeight*0.52:
                player1unit.combat.laneSpawn = 1;
                break;
            case window.innerHeight*0.80:
                player1unit.combat.laneSpawn = 2;
                break;
        }
        
        player1unit.scale.setTo(0.2, 0.2);
        game.physics.p2.enable(player1unit);
        player1unit.enableBody = true;
        player1unit.physicsBodyType = Phaser.Physics.P2JS;
        player1unit.body.data.gravityScale = 0.0;
        player1unit.body.data.damping = 0.0;
        player1unit.body.data.fixedY = true;
        player1unit.body.data.fixedX = false;
        player1unit.body.fixedRotation = true;
        player1unit.body.velocity.x = 10*player1unit.combat.speed;
        player1unit.body.velocity.y = 0;
        player1unit.body.setCollisionGroup(player1CollisionGroup);
          
        player1unit.body.collides(player2CollisionGroup, hitUnit, this);
        console.dir(player1unit);
        var healthbar = game.make.sprite(-player1unit.texture.width / 1.4, -player1unit.texture.height / 1.5, 'healthBar');
        healthbar.scale.setTo(5, 5);
        player1unit.addChild(healthbar);
 
            }
        }
        for(var i=0;i<buttonSpawn.length;i++){
            buttonSpawn[i].childNodes[1].textContent = player1base.resource[buttonSpawn[i].value.slice(0, -4)];
        }
        for(var i=0;i<resourceUI.length;i++){
            resourceUI[i].childNodes[1].textContent = player1base.resource[resourceUI[i].value.slice(0, -4)];
        }

    }
    else{
        
        for(var i =0;i<key.length;i++){
            if(player2base.resource[key[i]] >= resourceValues[key[i]]){
                
            }else{
                //console.log(player2base.resource[key[i]]);
                return;
        }
        if(i== key.length-1 && player2base.resource[key[i]] >= resourceValues[key[i]]){
            for(var j =0;j<key.length;j++){
                player2base.resource[key[j]] -= resourceValues[key[j]];
            }
        
        player2unit = player2group.create(window.innerWidth-x, y, playerSprite[1]);
        switch(playerSprite[1]){
            case "butter.png": 
                player2unit.combat = {...stats.butter, decision:0, laneSpawn:5  };
                break;
            case "flour.png": 
                player2unit.combat = {...stats.flour, decision:0, laneSpawn:5  };
                break;
            case "sugar.png": 
                player2unit.combat = {...stats.sugar, decision:0, laneSpawn:5  };
                break;
            case "oil.png": 
                player2unit.combat = {...stats.oil, decision:0, laneSpawn:5  };
                break;
            case "milk.png": 
                player2unit.combat = {...stats.milk, decision:0, laneSpawn:5  };
                break;
            case "water.png": 
                player2unit.combat = {...stats.water, decision:0, laneSpawn:5  };
                break;
            case "heat.png": 
                player2unit.combat = {...stats.heat, decision:0, laneSpawn:5  };
                break;
            case "cold.png": 
                player2unit.combat = {...stats.cold, decision:0, laneSpawn:5  };
                break;
            case "cracker.png": 
                player2unit.combat = {...stats.cracker, decision:0, laneSpawn:5  };
                break;
            case "lavaCake.png": 
                player2unit.combat = {...stats.lavaCake, decision:0, laneSpawn:5  };
                break;
            case "cupCake.png": 
                player2unit.combat = {...stats.cupCake, decision:0, laneSpawn:5  };
                break;
            case "monstrosity.png": 
                player2unit.combat = {...stats.monstrosity, decision:0, laneSpawn:5  };
                break;
            case "iceWater.png": 
                player2unit.combat = {...stats.iceWater, decision:0, laneSpawn:5  };
                break;
            case "milkTea.png": 
                player2unit.combat = {...stats.milkTea, decision:0, laneSpawn:5  };
                break;
            case "butterMilk.png": 
                player2unit.combat = {...stats.butterMilk, decision:0, laneSpawn:5  };
                break;
            case "bread.png": 
                player2unit.combat = {...stats.bread, decision:0, laneSpawn:5  };
                break;
            default:
                player2unit.combat = {...combat};
                break;
        }
            
        switch(y){
            case window.innerHeight*0.25:
                player2unit.combat.laneSpawn = 0;
                break;
            case window.innerHeight*0.52:
                player2unit.combat.laneSpawn = 1;
                break;
            case window.innerHeight*0.80:
                player2unit.combat.laneSpawn = 2;
                break;
        }
        player2unit.combat.speed *= -1;
        player2unit.scale.setTo(0.2, 0.2);
        game.physics.p2.enable(player2unit);
        player2unit.enableBody = true;
        player2unit.scale.x = -0.2;
        player2unit.physicsBodyType = Phaser.Physics.P2JS;
        player2unit.body.data.gravityScale = 0.0;
        player2unit.body.data.damping = 0.0;
        player2unit.body.data.fixedY = true;  
        player2unit.body.data.fixedX = false; 
        player2unit.body.fixedRotation = true;
        player2unit.body.velocity.x = 10*player2unit.combat.speed;
        player2unit.body.setCollisionGroup(player2CollisionGroup);

        player2unit.body.collides(player1CollisionGroup, hitUnit, this);
          
        var healthbar2 = game.make.sprite(-player2unit.texture.width / 1.4, -player2unit.texture.height / 1.5, 'healthBar');
        healthbar2.scale.setTo(5, 5);
        player2unit.addChild(healthbar2);
          
        //console.dir(player2unit);
        for(var i=0;i<buttonSpawn.length;i++){
            buttonSpawn[i].childNodes[1].textContent = player1base.resource[buttonSpawn[i].value.slice(0, -4)];
    }

    }
        }
            
            
}};

Game.ChangeUnit = function(spriteName,playerNum){
    ////console.dir(playerSprite);
    playerSprite[playerNum] = spriteName;
};

Game.removePlayer = function(id){
    Game.playerMap[id].destroy();
    delete Game.playerMap[id];
};

Game.update = function(){
    if(game.paused === true){
    if (game.input.keyboard.isDown(Phaser.Keyboard.N))
    {
        game.state.start('Game');
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

function stopSpawn(base) {
    base.canSpawn = true;
};

function hitUnit(body1, body2) {
       ////console.dir(body1.sprite.combat.health);
  ////console.dir(body2.sprite.combat.health);
    body1.sprite.combat.decision = combatMovement.attack;
    if(body1.sprite.combat.decision == combatMovement.attack ){
        body1.data.velocity = [0,0];
        //body1.velocity.destination = [0,0];
        body1.static = true;
        //console.dir(body1.sprite);
            //  Set a TimerEvent to occur after 2 seconds
        //timer.loop(1000*body1.sprite.combat.waitTime, damageCalculation(body1,body2), this);
        game.time.events.add(1000*body1.sprite.combat.wait, damageCalculation,this,body1,body2);
    }


}

function damageCalculation(body1,body2) {
    
    //console.dir(body1);
  
    //console.dir(body1.sprite.children[0]);
    //console.dir(body2.sprite.children[0]);
  
    if(body1.sprite == null || body2.sprite == null) {
      return;
    }
    //console.dir(body1);
    //console.dir(body2);
  
    if(body2.sprite.combat.health <= 0 || body2.sprite == null ){
        body2.sprite.pendingDestroy = true;
        body2.removeNextStep = true;
        body1.sprite.combat.decision = combatMovement.move;
        body1.static = false;
        body1.data.inertia = 0;
        body1.data.velocity = [-1*body1.sprite.combat.speed,0];
        body2.sprite.children[0].pendingDestroy = true;
        body2.sprite.children[0].removeNextStep = true;
        
        ////console.dir(body1.sprite.combat.speed);
        return;
    } else if(body1.sprite == null){
        return;
    }
    if((body2.sprite.pendingDestroy == true &&  body2.removeNextStep == true) ||  (body1.sprite.pendingDestroy == true &&  body1.removeNextStep == true)){
        
    }else{
        if(body2.sprite.combat.type == 's'){
        switch(body1.sprite.combat.type){
            case 's':
                body2.sprite.combat.health -= body1.sprite.combat.att;
                break;
            case 'l':
                body2.sprite.combat.health -= (body1.sprite.combat.att*2);
                break;
            case 'm':
                body2.sprite.combat.health -= (body1.sprite.combat.att/2);
                break;
            default:
                body2.sprite.combat.health -= body1.sprite.combat.att;
                break;
        }
    }else if(body2.sprite.combat.type == 'm'){
        switch(body1.sprite.combat.type){
            case 's':
                body2.sprite.combat.health -= (body1.sprite.combat.att/2);
                break;
            case 'l':
                body2.sprite.combat.health -= (body1.sprite.combat.att*2);
                break;
            case 'm':
                body2.sprite.combat.health -= (body1.sprite.combat.att);
                break;
            default:
                body2.sprite.combat.health -= body1.sprite.combat.att;
                break;
        }
    }else if(body2.sprite.combat.type == 'l'){
        switch(body1.sprite.combat.type){
            case 's':
                body2.sprite.combat.health -= (body1.sprite.combat.att*2);
                break;
            case 'l':
                body2.sprite.combat.health -= (body1.sprite.combat.att);
                break;
            case 'm':
                body2.sprite.combat.health -= (body1.sprite.combat.att/2);
                break;
            default:
                body2.sprite.combat.health -= body1.sprite.combat.att;
                break;
        }
    }else if(body2.sprite.combat.type == 'b'){
        console.dir(body2);
        if(body2.sprite.combat.health > 0){
            if(body2.collidesWith[0].mask == 4){
                player2base.combat.health -= body1.sprite.combat.att + body1.sprite.combat.health;
                console.dir(player2base);
            }else if(body2.collidesWith[0].mask == 8){
                player1base.combat.health -= body1.sprite.combat.att + body1.sprite.combat.health;
                console.dir(player1base);
            }
            if(player2base.combat.health <= 0){

                    Client.gameOver("p2");
                    gameText = game.add.text(window.innerWidth/2, window.innerHeight, 'You win', { font: '24px Arial', fill: '#000' });
                game.paused = true;
            }else if(player1base.combat.health <= 0){
                    Client.gameOver("p1");
                    gameText = game.add.text(window.innerWidth/2, window.innerHeight, 'You lose', { font: '24px Arial', fill: '#000' });
                game.paused = true;
                }
                
        }
        body1.sprite.pendingDestroy = true;
        body1.removeNextStep = true;
    }
    else{
        body2.sprite.combat.health -= body1.sprite.combat.att;
    }
    }
    if(body2.sprite != null){
      if(body2.collidesWith[0].mask == 8){
        player1base.children[0].scale.x = (player1base.combat.health / player1base.combat.maxHealth) * 1.4;
      }else if(body2.collidesWith[0].mask == 4){
        player2base.children[0].scale.x = (player2base.combat.health / player2base.combat.maxHealth) * 1.4;
      } else {
         
         body2.sprite.children[0].scale.x = (body2.sprite.combat.health / body2.sprite.combat.maxHealth) * 5;
      }
        
    }
  body1.sprite.children[0].scale.x = (body1.sprite.combat.health / body1.sprite.combat.maxHealth) * 5;
    ////console.log("curr enemy health: " + body2.sprite.combat.health);
    /*
    if(body2.sprite.key === "player2base" || body2.sprite.key === "player1base"){
        body1.sprite.pendingDestroy = true;
        body1.removeNextStep = true;
        for(var x = 0; x<3;x++){
            if(activeLane[x] == 1){
                return;
            }
            if(x == 2){
                if(p1Point > p2Point){
                    Client.gameOver("p2");
                gameText = game.add.text(window.innerWidth/2, window.innerHeight, 'You win', { font: '24px Arial', fill: '#000' });
                }
                if(p2Point > p1Point){
                    Client.gameOver("p1");
                gameText = game.add.text(window.innerWidth/2, window.innerHeight, 'You lose', { font: '24px Arial', fill: '#000' });
                }
                game.paused = true;
            }
        }  
    }
    
    */
    if(body1.sprite.combat.health > 0){
        game.time.events.add(1000*body1.sprite.combat.wait, damageCalculation,this,body1,body2);
      
      
    }
  
    
  
    
    
}





Phaser.Filter.Glow = function (game) {
    'use strict';
    Phaser.Filter.call(this, game);
    this.uniforms.alpha = { type: '1f', value: 1.0 };
    //the shader, remove cosine/sine to make it a static glow
    this.fragmentSrc = [
        'precision lowp float;',
        'varying vec2 vTextureCoord;',
        'varying vec4 vColor;',
        'uniform sampler2D uSampler;',
        'uniform float alpha;',
        'uniform float time;',
        'void main() {',
            'vec4 sum = vec4(0);',
            'vec2 texcoord = vTextureCoord;',
            'for(int xx = -4; xx <= 4; xx++) {',
                'for(int yy = -4; yy <= 4; yy++) {',
                    'float dist = sqrt(float(xx*xx) + float(yy*yy));',
                    'float factor = 0.0;',
                    'if (dist == 0.0) {',
                        'factor = 2.0;',
                    '} else {',
                        'factor = 2.0/abs(float(dist));',
                    '}',
                    'sum += texture2D(uSampler, texcoord + vec2(xx, yy) * 0.002) * (abs(sin(time))+0.06);',
                '}',
            '}',
            'gl_FragColor = sum * 0.025 + texture2D(uSampler, texcoord)*alpha;',
        '}'
    ];
};
  
Phaser.Filter.Glow.prototype = Object.create(Phaser.Filter.prototype);
Phaser.Filter.Glow.prototype.constructor = Phaser.Filter.Glow;

Object.defineProperty(Phaser.Filter.Glow.prototype, 'alpha', {

    get: function() {
        return this.uniforms.alpha.value;
    },

    set: function(value) {
        this.uniforms.alpha.value = value;
    }

});




