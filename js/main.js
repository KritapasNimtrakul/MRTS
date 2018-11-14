var stats = {
  
  butter: {
    "att": 1,
    "health": 2,
    "speed": 6,
    "range": 1,
    "wait": 0.5,
    "type":"s",
  },
  
  flour: {
    "att": 2,
    "health": 2,
    "speed": 2,
    "range": 1,
    "wait": 0.5,
    "type":"s",
  },
  
  sugar: {
    "att": 2,
    "health": 1,
    "speed": 8,
    "range": 1,
    "wait": 0.5,
      "type":"s",
  },
  
  oil: {
    "att": 2,
    "health": 1,
    "speed": 2,
    "range": 4,
    "wait": 0.5,
      "type":"s",
  },
  
  milk: {
    "att": 2,
    "health": 2,
    "speed": 3,
    "range": 3,
    "wait": 0.5,
      "type":"s",
  },
  
  water: {
    "att": 1,
    "health": 1,
    "speed": 3,
    "range": 6,
    "wait": 0.5,
      "type":"s",
  },
  
  heat: {
    "att": 2,
    "health": 1,
    "speed": 3,
    "range": 4,
    "wait": 0.5,  
      "type":"s",
  },
  
  cold: {
    "att": 1,
    "health": 2,
    "speed": 2,
    "range": 4,
    "wait": 0.5,  
      "type":"s",
  },
  
  cracker: {
    "att": 2,
    "health": 4,
    "speed": 4,
    "range": 1,
    "wait": 0.5,
      "type":"s",
  },
  
  bread: {
    "att": 2,
    "health": 5,
    "speed": 6,
    "range": 1,
    "wait": 0.5,
      "type":"s",
  },
  
  lavaCake: {
    "att": 11,
    "health": 3,
    "speed": 8,
    "range": 1,
    "wait": 0.5,  
      "type":"s",
  },
  
  cupCake: {
    "att": 6,
    "health": 10,
    "speed": 4,
    "range": 1,
    "wait": 0.5,  
      "type":"s",
  },
  
  monstrosity: {
    "att": 11,
    "health": 11,
    "speed": 2,
    "range": 1,
    "wait": 0.5,
      "type":"s",
  },
  
  iceWater: {
    "att": 2,
    "health": 2,
    "speed": 4,
    "range": 6,
    "wait": 0.5,
      "type":"s",
  },
  
  milkTea: {
    "att": 4,
    "health": 5,
    "speed": 2,
    "range": 4,
    "wait": 0.5,
      "type":"s",
  },
  
  butterMilk: {
    "att": 2,
    "health": 1,
    "speed": 6,
    "range": 8,
    "wait": 0.5,
      "type":"s",
  },
  base : {
      "att": 10000,
    "health": 100,
    "speed": 0,
    "range": 0,
    "wait": 100000,
      "type":"s",
  },
  none : {
            "att": 0,
    "health": 1,
    "speed": 0,
    "range": 0,
    "wait": 10000,
      "type":"s",
  }
};

var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, document.getElementById('game'));
game.state.add('Game',Game);
game.state.add('Lobby',Lobby);
game.state.add('Over',Over);
game.state.start('Game');

var list1 = ["butter.png","flour.png","milk.png","sugar.png"];
var list2 = ["cold.png","heat.png","oil.png","water.png"];
var list3 = ["glass.png","bread.png","lavaCake.png","cupCake.png"];
var list4 = ["monstrosity.png","iceWater.png","milkTea.png","butterMilk.png"];
var list5 = [stats.butter, stats.flour, stats.milk, stats.sugar];
var list6 = [stats.cold, stats.hot, stats.oil, stats.water];
var list7 = [stats.none, stats.bread, stats.lavaCake, stats.cupCake];
var list8 = [stats.monstrosity, stats.iceWater, stats.milkTea, stats.butterMilk];

var ui = document.createElement('div');
ui.classList.add("js-overlay");
ui.classList.add("overlay");

var buttonOverlay = document.createElement('div');
buttonOverlay.classList.add("b1-overlay");

var button1 = document.createElement('button');
button1.classList.add("b1");
var t1 = document.createTextNode("Ingredients");
button1.appendChild(t1);
buttonOverlay.appendChild(button1);

var button2 = document.createElement('button');
button2.classList.add("b2");
var t2 = document.createTextNode("Menu");
button2.appendChild(t2);
buttonOverlay.appendChild(button2);

ui.appendChild(buttonOverlay);

var InventoryOverlay = document.createElement('div');
InventoryOverlay.classList.add("inventory-overlay");

for(var i=0;i<4;i++){
    
var InventorySlot = document.createElement('div');
InventorySlot.classList.add("inventory-slot");

var slot1 = document.createElement('button');
slot1.classList.add("slot");
slot1.value = list1[i];

var img1 = document.createElement('img');
img1.classList.add("img1");
img1.src = "../assets/sprites/"+list1[i];
slot1.appendChild(img1);
    
var resouceDP1 = document.createElement('div');
resouceDP1.classList.add("resouceDP");
var t1 = document.createTextNode("0");
resouceDP1.appendChild(t1);
slot1.appendChild(resouceDP1);

var slot2 = document.createElement('button');
slot2.classList.add("slot");
slot2.value = list2[i];

var img2 = document.createElement('img');
img2.classList.add("img1");
img2.src = "../assets/sprites/"+list2[i];
slot2.appendChild(img2);
    
var resouceDP2 = document.createElement('div');
resouceDP2.classList.add("resouceDP");
var t1 = document.createTextNode("0");
resouceDP2.appendChild(t1);
slot2.appendChild(resouceDP2);



InventorySlot.appendChild(slot1);
InventorySlot.appendChild(slot2);


InventoryOverlay.appendChild(InventorySlot);
}

var backDiv = document.createElement('div');
backDiv.classList.add("backDiv");
var backBtn = document.createElement('button');
backBtn.classList.add("backBtn");
var backText = document.createTextNode("\u21e6");
backBtn.appendChild(backText);

backDiv.appendChild(backBtn);
InventorySlot.appendChild(backDiv);
ui.appendChild(InventoryOverlay);




var SpecialOverlay = document.createElement('div');
SpecialOverlay.classList.add("special-overlay");

for(var i=0;i<4;i++){
    
var SpecialSlot = document.createElement('div');
SpecialSlot.classList.add("special-slot");

var slot1 = document.createElement('button');
slot1.classList.add("slot");
slot1.value = list3[i];

var img1 = document.createElement('img');
img1.classList.add("img1");
img1.src = "../assets/sprites/"+list3[i];
slot1.appendChild(img1);
    
var resouceDP1 = document.createElement('div');
resouceDP1.classList.add("resouceDP");
var t1 = document.createTextNode("0");
resouceDP1.appendChild(t1);
slot1.appendChild(resouceDP1);


var slot2 = document.createElement('button');
slot2.classList.add("slot");
slot2.value = list4[i];

var img2 = document.createElement('img');
img2.classList.add("img1");
img2.src = "../assets/sprites/"+list4[i];
slot2.appendChild(img2);
    
var resouceDP2 = document.createElement('div');
resouceDP2.classList.add("resouceDP");
var t1 = document.createTextNode("0");
resouceDP2.appendChild(t1);
slot2.appendChild(resouceDP2);


SpecialSlot.appendChild(slot1);
SpecialSlot.appendChild(slot2);


SpecialOverlay.appendChild(SpecialSlot);
}
var backDiv = document.createElement('div');
backDiv.classList.add("backDiv");
var backBtn = document.createElement('button');
backBtn.classList.add("backBtn");
var backText = document.createTextNode("\u21e6");
backBtn.appendChild(backText);

backDiv.appendChild(backBtn);
SpecialOverlay.appendChild(backDiv);

var statsOverlay = document.createElement('div');
statsOverlay.classList.add("stats");

statsOverlay.style.top = "0px";
statsOverlay.style.left = window.innerWidth / 2 - 525 + "px";

var statsTitle = document.createElement('p');
statsTitle.classList.add("statsText");

statsOverlay.appendChild(statsTitle);

ui.appendChild(statsOverlay);

ui.appendChild(SpecialOverlay);

document.getElementById('game').appendChild(ui);

