"use strict";

function Room(roomName,shortDesc, lDesc, things, roomID, pitchBlack, enemies, exits) {
    var roomState = {
        name: roomName,
        shortDesc: shortDesc,
        lDesc: lDesc,
        things: things,//WORST VARIABLE NAME EVER
        roomID: roomID,
        pitchBlack: pitchBlack,
        enemies: enemies,
        exits: exits,

        get description() {
            var tempDescription = lDesc;//Technically this is very bad, because we make a new string everytime we modify it, but it works for now

            for (var i = 0; i < currentRoom.things.length; i++) {
                    tempDescription += " " + things[i].itemInRoomDesc;
                };
                for (var i = 0; i < currentRoom.enemies.length; i++) {
                    if(enemies[i].monsterDefense > 0) {
                        tempDescription +=  " " + enemies[i].monsterInRoomDesc;
                    }
                    else {
                       tempDescription += " " + enemies[i].deadDesc;
                    }
                }
                if(currentRoom.exits.length > 0) {
                    if(currentRoom.exits.length == 1) {
                        tempDescription += " There is an exit to the ";
                        tempDescription += " " + currentRoom.exits[0] + ".";
                    }
                    else if(currentRoom.exits.length == 2) {
                        tempDescription += " There are exits to the ";
                        tempDescription += " " + currentRoom.exits[0] + " and to the " + currentRoom.exits[1] + ".";
                    }
                    else if(currentRoom.exits.length == 3) {
                        tempDescription += " There are exits to the ";
                        tempDescription += " " + currentRoom.exits[0] + ", " + currentRoom.exits[1] + ", and " + currentRoom.exits[2] + ".";
                    }
                    else if(currentRoom.exits.length == 4) {
                        tempDescription += " There are exits to the ";
                        tempDescription += " " + currentRoom.exits[0] + ", " + currentRoom.exits[1] + ", " + currentRoom.exits[2] + ", and " + currentRoom.exits[3] + ".";
                    }
                }
            return tempDescription;
        }
    };

    return Object.assign(roomState, canBeIdentifiedByName(roomState));
}

var cave = new Room(
    "cave",
    "a dark, dank cave.",
    "This cave is drafty, and the walls slimy. There is barely enough light to see.",
    [pebble, torch],
    11,
    false,
    [],
    ["north"]
    );
var hall = new Room(
    "hall",
    "a long stone tunnel.",
    "Hewn stone walls extend north creating a claustrophobic hall.",
    [doubleDoors, dungeonPass, kitchenDoor, sword],
    7,
    false,
    [],
    ["north", "east", "south", "west"]
    );
var dungeon = new Room(
    "dungeon",
    "an underground dungeon.",
    "Iron shackles imprison calcified skeletons against the walls. A large chandelier made of antlers casts an deathly pallor across the room.",
    [key],
    6,
    false,
    [troll],
    ["east"]
    );
var kitchen = new Room(
    "kitchen",
    "a warm kitchen.",
    "The smell of cooked food is baked into the walls. The room is warm, and well-lit, thanks to the hearth.",
    [],
    8,
    false,
    [],
    ["north", "west"]
    );
var allRooms = [cave, hall, dungeon, kitchen];

