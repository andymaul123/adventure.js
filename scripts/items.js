"use strict";

var canBeActivated = function canBeActivated(state) {
    return {
        activate: function() {
            $('.message').html("It's a " + state + ". What would you expect to happen?");
        }
    }
};

var canBeOpened = function canBeOpened(state) {
    return {
        activate: function() {
            if (state.isLocked) {
                $('.message').html("Try as you might, it won't budge.");
            }
            else if (state.isOpen == false) {
                state.isOpen = true;
                $('.message').html("With some effort you slowly push it open.");
            }
            else {
                $('.message').html("There's not much more to be done with it");
            }
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

function Door(doorName, doorDesc, doorInRoomDesc, isLocked, isOpen, directionBlocked) {
    var doorState = {
        isLocked: isLocked,
        isOpen: isOpen,
        directionBlocked: directionBlocked
    };
    return Object.assign(doorState,
        new Item(doorName, doorDesc, doorInRoomDesc, false),
        canBeOpened(doorState));
}

/*
============================================================================================
Items in Room: Cave
============================================================================================
*/
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
    $('.message').html("With a few sparks from your flint and steel the torch catches and roars to life.");
}
/*
============================================================================================
Items in Room: Hall
============================================================================================
*/
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
                    $('.message').html("With a final swing the " + currentRoom.enemies[i] + " falls to the floor, dead.");
                 }
                 else {
                    $('.message').html("You swing your sword at the " + currentRoom.enemies[i] + "!");
                 }
            }
            else {
                $('.message').html("The " + currentRoom.enemies[i] + " is already dead.");
            }
        }
    }
    else {
        $('.message').html("It's dangerous to swing a sword around like a toy.");
    }
}

var key = new Item(
    "key",
    "Small iron key.",
    "A small key twinkles in the flickering light of your torch.",
    true
);
key.activate = function() {
    if (currentRoom == hall){
        doubleDoors.locked = false;
        $('.message').html("With a twist the doors' lock disengages.");
    }
    else {
        $('.message').html("Now is not the time to use that.");
    }
}

var doubleDoors = new Door(
    "double-doors",
    "A set of double-doors.",
    "It culminates in a set of massive double-doors made from wood and reinforced with iron.",
    true,
    false,
    "north"
);
var dungeonPass = new Door(
    "passage",
    "A passage leading down and to the west.",
    "There is a passage on the west wall leading down.",
    null,
    true,
    null
);
var kitchenDoor = new Door(
    "door",
    "An old wooden door, slightly warped.",
    "The eastern wall sports a warped old door.",
    false,
    false,
    "east"
);
kitchenDoor.activate = function() {
    if (kitchenDoor.isLocked) {
        $('.message').html("It appears to be locked, and won't open.");
    }
    else if (kitchenDoor.isOpen == false) {
        kitchenDoor.isOpen = true;
        $('.message').html("The wood creaks almost as loud as the hinges, but the door swings open with some effort.");
    }
    else {
        $('.message').html("It's already open, and unless you want to oil the hinges there isn't much else to do.");
    }
}
/*
============================================================================================
Items in Room: Kitchen
============================================================================================
*/
var knife = new Item(
    "knife",
    "A long kitchen knife.",
    "On the table rests a long iron knife.",
    true
);
knife.activate = function() {
    if(currentRoom.enemies.length >= 1) {
        for (var i = 0; i < currentRoom.enemies.length; i++) {
            if(currentRoom.enemies[i].monsterDefense > 0) {
                currentRoom.enemies[i].monsterDefense -= 3.5;
                console.log(currentRoom.enemies[i].monsterDefense);
                 if(currentRoom.enemies[i].monsterDefense <= 0) {
                    $('.message').html("With a vicious stab the " + currentRoom.enemies[i] + " falls to the floor, dead.");
                 }
                 else {
                    $('.message').html("You stab the " + currentRoom.enemies[i] + " with your knife!");
                 }
            }
            else {
                $('.message').html("The " + currentRoom.enemies[i] + " is already dead!");
            }
        }
    }
    else {
        $('.message').html("Easy, stabby. There's nothing to use a knife on.");
    }
}
/*
============================================================================================
Items in Room: Library
============================================================================================
*/
var scroll = new Item(
    "scroll",
    "A map scrawled on a scroll of vellum.",
    "Though most of the books look as if they haven't been touched in ages, a scroll rests, half unrolled, on a nearby desk.",
    true
);
var mapPicture = 
"The scroll unfolds to reveal:" + "<br>" + 
"--------------------" + "<br>" + 
"|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|" + "<br>" + 
"|&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|" + "<br>" + 
"|&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;x&nbsp;&nbsp;x&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|" + "<br>" + 
"|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|" + "<br>" + 
"|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|" + "<br>" + 
"|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|" + "<br>" + 
"--------------------";

console.log(mapPicture);
scroll.activate = function() {
    $('.message').html(mapPicture);
}