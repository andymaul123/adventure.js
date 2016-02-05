/*
To Dos
-------------------------

Commands: Attack/Use, Move

Map:
x		x	x
x	x	x	x
		S	


1	2	3	4
5	6	7	8
9	10	11	12

Room Legend
[N, E, S, W]

Basic idea for movement. Each room gets an ID that's a number 1-12 laid out
according to the map above. Each room gets an array called room legend that gives
an integer relating to a cardinal direction.

In our example, the starting room is room 11. To go north you would add -4.
Thus, the first item in the room legend array is -4 which relates to north.
To make a room not exist, the direction gets a negative value equal to the roomID resulting in 0.
0 = does not exist in our movement function.



*/

$(document).ready(function() {

	//Inventory
	var backpack = [];

	// Things
	function Item(itemName, itemDesc, itemInRoomDesc) {
		this.itemName = itemName;
		this.itemDesc = itemDesc;
		this.itemInRoomDesc = itemInRoomDesc;
	}
	var pebble = new Item(
		"pebble",
		"A small, smooth pebble.",
		"On the floor there is a pebble."
		);
	var torch = new Item(
		"torch",
		"A wooden haft with oil soaked rags wrapped around the top. It would readily burn.",
		"A rusted iron bracket holds a single torch."
		);
	//Rooms
	function Room(roomName,shortDesc, lDesc, things, roomID, roomLegend) {
		this.roomName = roomName;
		this.shortDesc = shortDesc;
		this.lDesc = lDesc;
		this.lDescModified = lDesc;
		this.things = things;
		this.roomID = roomID;
		this.roomLegend = roomLegend;
	}

	var cave = new Room(
		"cave",
		"a dark, dank cave.", 
		"This cave is drafty, and the walls slimy. There is barely enough light to see.",
		[pebble, torch],
		11,
		[-4,-11,-11,-11]
		);
	var hall = new Room(
		"hall",
		"a long stone tunnel.",
		"Hewn stone walls extend north creating a claustrophobic hall that culminates in a set of double-doors.",
		7,
		[-4,1,] // to-do
		);
	
	var currentRoom = cave;
	
	// Room Update Function
	function updateRoomDesc() {
		currentRoom.lDescModified =  currentRoom.lDesc;
		for (var i = 0; i < currentRoom.things.length; i++) {
			currentRoom.lDescModified = currentRoom.lDescModified + " " + currentRoom.things[i].itemInRoomDesc;
		};
	}
	updateRoomDesc();

	$('.message').text("You are in " + currentRoom.shortDesc);

	// Array of Commands
	var commandArray = ["look", "move", "take", "inventory"];

	//Input Controls
	$(document).keypress(function(e){
		if(e.which == 13) {
			onSubmit();
			return false;
		}
	});
	// Input Delegation
	function onSubmit() {
		var enteredInputs = $('input').val().split(" ");
		var command = enteredInputs[0];
		var modifier = enteredInputs[1];

		if ($.inArray( command, commandArray) > -1) {
			window[command](modifier);
		}
		else {
			$('.message').text("I don't understand that command.");
		}
		$('input').val("");
	}
	// Look Command function
	window.look = function(optionalObject) {
		if(optionalObject) {
			var isAThingCounter = false;
			for (var i = 0; i < currentRoom.things.length; i++) {
				if (currentRoom.things[i].itemName == optionalObject) {
					$('.message').text(currentRoom.things[i].itemDesc);
					isAThingCounter = true;
				}
			};
			for (var i = 0; i < backpack.length; i++) {
				if (backpack[i].itemName == optionalObject) {
					$('.message').text(backpack[i].itemDesc + " It is in your backpack.");
					isAThingCounter = true;
				}
			};
			if (isAThingCounter == false) {
				$('.message').text("Not much to see here.");
			}
		}
		else {
			$('.message').text(currentRoom.lDescModified);
		}
	}
	// Take Command function
	window.take = function(optionalObject) {
		if(optionalObject) {
			for (var i = 0; i < currentRoom.things.length; i++) {
				if (currentRoom.things[i].itemName == optionalObject) {
					$('.message').text("You take the " + currentRoom.things[i].itemName + ".");
					backpack.push(currentRoom.things[i]);
					currentRoom.things.splice(i,1);
					updateRoomDesc();
				}
				else {
					$('.message').text("You can't take that.");
				}
			};
		}
		else {
			$('.message').text("Take what?");
		}
	}
	// Inventory Command function
	window.inventory = function() {
		if(backpack.length > 0) {
			var tempBackpack = [];
			for (var i = 0; i < backpack.length; i++) {
				tempBackpack.push(backpack[i].itemName);
			};
			$('.message').text("You have " + tempBackpack.join(', '));
		}
		else {
			$('.message').text("Your inventory is empty.");
		}
	}

});