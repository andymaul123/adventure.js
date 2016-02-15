function Room(roomName,shortDesc, lDesc, things, roomID, pitchBlack, enemies) {
    var roomState = {
        name: roomName,
        shortDesc: shortDesc,
        lDesc: lDesc,
        lDescModified: lDesc,
        things: things,
        roomID: roomID,
        pitchBlack: pitchBlack,
        enemies: enemies
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

function updateRoomDesc() {
    currentRoom.lDescModified =  currentRoom.lDesc;
    for (var i = 0; i < currentRoom.things.length; i++) {
        currentRoom.lDescModified = currentRoom.lDescModified + " " + currentRoom.things[i].itemInRoomDesc;
    };
    for (var i = 0; i < currentRoom.enemies.length; i++) {
        if(currentRoom.enemies[i].monsterDefense > 0) {
            currentRoom.lDescModified = currentRoom.lDescModified + " " + currentRoom.enemies[i].monsterInRoomDesc;
        }
        else {
           currentRoom.lDescModified = currentRoom.lDescModified + " " + currentRoom.enemies[i].monsterDeadDesc; 
        }
    }
}

