/*
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
*/
var list1 = ["butter.png","flour.png","Milk.png","Sugar.png"];
var list2 = ["cold.png","hot.png","oil.png","water.png"];
var list3 = ["cracker","bread","lavacake","cupcake"];
var list4 = ["Monstrosity","IceWater","MilkTea","buttermilk"];
var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, document.getElementById('game'));
var ui = document.createElement('div');
ui.classList.add("js-overlay");
ui.classList.add("overlay");

var buttonOverlay = document.createElement('div');
buttonOverlay.classList.add("b1-overlay");

var button1 = document.createElement('button');
button1.classList.add("b1");
var t1 = document.createTextNode("I");
button1.appendChild(t1);
buttonOverlay.appendChild(button1);

var button2 = document.createElement('button');
button2.classList.add("b2");
var t2 = document.createTextNode("S");
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

var slot2 = document.createElement('button');
slot2.classList.add("slot");
slot2.value = list2[i];

var img2 = document.createElement('img');
img2.classList.add("img1");
img2.src = "../assets/sprites/"+list2[i];
slot2.appendChild(img2);

InventorySlot.appendChild(slot1);
InventorySlot.appendChild(slot2);


InventoryOverlay.appendChild(InventorySlot);
}

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

var slot2 = document.createElement('button');
slot2.classList.add("slot");
slot2.value = list4[i];

var img2 = document.createElement('img');
img2.classList.add("img1");
img2.src = "../assets/sprites/"+list4[i];
slot2.appendChild(img2);

SpecialSlot.appendChild(slot1);
SpecialSlot.appendChild(slot2);


SpecialOverlay.appendChild(SpecialSlot);
}

ui.appendChild(SpecialOverlay);










document.getElementById('game').appendChild(ui);
game.state.add('Game',Game);
game.state.start('Game');