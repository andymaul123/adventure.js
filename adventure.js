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
	function Room(shortDesc, lDesc, things) {
		this.shortDesc = shortDesc;
		this.lDesc = lDesc;
		this.lDescModified = lDesc;
		this.things = things;
	}

	var cave = new Room(
		"a dark, dank cave.", 
		"This cave is drafty, and the walls slimy.",
		[pebble, torch]
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

