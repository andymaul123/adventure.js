function Item(itemName, itemDesc, itemInRoomDesc, canBeTaken) {
    this.itemName = itemName;
    this.itemDesc = itemDesc;
    this.itemInRoomDesc = itemInRoomDesc;
    this.canBeTaken = canBeTaken;
}

// Room 1 Cave Items
var pebble = new Item(
    "pebble",
    "A small, smooth pebble.",
    "On the floor there is a pebble.",
    true
);

pebble.activate = function() {
    $('.message').text("It's a pebble. What would you expect to happen?");
}

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