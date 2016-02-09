function Room(roomName,shortDesc, lDesc, things, roomID, pitchBlack) {
    this.roomName = roomName;
    this.shortDesc = shortDesc;
    this.lDesc = lDesc;
    this.lDescModified = lDesc;
    this.things = things;
    this.roomID = roomID;
    this.pitchBlack = pitchBlack;
}

var cave = new Room(
    "cave",
    "a dark, dank cave.",
    "This cave is drafty, and the walls slimy. There is barely enough light to see.",
    [pebble, torch],
    11,
    false
    );
var hall = new Room(
    "hall",
    "a long stone tunnel.",
    "Hewn stone walls extend north creating a claustrophobic hall that culminates in a set of double-doors.",
    [doubleDoors, key],
    7,
    true
    );

var allRooms = [cave, hall];

function updateRoomDesc() {
    currentRoom.lDescModified =  currentRoom.lDesc;
    for (var i = 0; i < currentRoom.things.length; i++) {
        currentRoom.lDescModified = currentRoom.lDescModified + " " + currentRoom.things[i].itemInRoomDesc;
    };
}

