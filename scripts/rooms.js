"use strict";

function Room(roomName,shortDesc, lDesc, things, roomID, pitchBlack, enemies) {
    var roomState = {
        name: roomName,
        shortDesc: shortDesc,
        lDesc: lDesc,
        things: things,//WORST VARIABLE NAME EVER
        roomID: roomID,
        pitchBlack: pitchBlack,
        enemies: enemies,

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
    []
    );
var hall = new Room(
    "hall",
    "a long stone tunnel.",
    "Hewn stone walls extend north creating a claustrophobic hall that culminates in a set of double-doors.",
    [doubleDoors, key, sword],
    7,
    true,
    []
    );
var dungeon = new Room(
    "dungeon",
    "an underground dungeon.",
    "Iron shackles imprison calcified skeletons against the walls. A large chandelier made of antlers casts an deathly pallor across the room.",
    [],
    6,
    false,
    [troll]
    );

var allRooms = [cave, hall, dungeon];

