"use strict";

var canBeActivated = function canBeActivated(state) {
    return {
        activate: function() {
            $('.message').text("It's a " + state + ". What would you expect to happen?");
        }
    }
}

function Item(itemName, itemDesc, itemInRoomDesc, canBeTaken) {
    var itemState = {
        name: itemName,
        itemDesc: itemDesc,
        itemInRoomDesc: itemInRoomDesc,
        canBeTaken: canBeTaken
    };

    return Object.assign(itemState,canBeIdentifiedByName(itemState),canBeActivated(itemState));
}

// Room 1 Cave Items
var pebble = new Item(
    "pebble",
    "A small, smooth pebble.",
    "On the floor there is a pebble.",
    true
);

var torch = new Item(
    "torch",
    "A wooden haft with oil soaked rags wrapped around the top. It would readily burn.",
    "A rusted iron bracket holds a single torch.",
    true
);

torch.activate = function() {
    playerHasLight = true;
    $('.message').text("With a few sparks from your flint and steel the torch catches and roars to life.");
}
var sword = new Item(
    "sword",
    "A long steel blade that still holds an edge, despite its obvious age.",
    "On the wall is a wooden plaque with a sword fastened horizontally.",
    true
    );
sword.activate = function() {
    if(currentRoom.enemies.length >= 1) {
        for (var i = 0; i < currentRoom.enemies.length; i++) {
            if(currentRoom.enemies[i].monsterDefense > 0) {
                currentRoom.enemies[i].monsterDefense -= 5;
                console.log(currentRoom.enemies[i].monsterDefense);
                 if(currentRoom.enemies[i].monsterDefense <= 0) {
                    $('.message').text("With a final swing the " + currentRoom.enemies[i] + " falls to the floor, dead.");
                 }
                 else {
                    $('.message').text("You swing your sword at the " + currentRoom.enemies[i] + "!");
                 }
            }
            else {
                $('.message').text("The " + currentRoom.enemies[i] + " is already dead.");
            }
        }
    }
    else {
        $('.message').text("It's dangerous to swing a sword around like a toy.");
    }
}

//Room 2 Hall Items
var key = new Item(
    "key",
    "Small iron key.",
    "A small key twinkles in the flickering light of your torch.",
    true
);

key.activate = function() {
    if (currentRoom == hall){
        doubleDoors.locked = false;
        $('.message').text("With a twist the doors' lock disengages.");
    }
    else {
        $('.message').text("Now is not the time to use that.");
    }
}

var doubleDoors = new Item(
    "doors",
    "A set of double doors.",
    "Massive double doors made from wood and reinforced with iron.",
    false
);

doubleDoors.locked = true;
doubleDoors.open = false;
doubleDoors.activate = function() {
    if (doubleDoors.locked) {
        $('.message').text("Try as you might, the doors won't budge.");
    }
    else if (doubleDoors.open == false) {
        doubleDoors.open = true;
        $('.message').text("With some effort you slowly push the double doors open.");
    }
    else {
        $('.message').text("There's not much more to be done with the doors.");
    }
}