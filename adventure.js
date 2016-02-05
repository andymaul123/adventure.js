$(document).ready(function() {

	//Inventory
	var backpack = [];

	// Things
	function Item(itemName, itemDesc) {
		this.itemName = itemName;
		this.itemDesc = itemDesc;
	}
	var pebble = new Item(
		"pebble",
		"A small, smooth pebble."
		);
	//Rooms
	function Room(shortDesc, lDesc, things) {
		this.shortDesc = shortDesc;
		this.lDesc = lDesc;
		this.things = things;
	}

	var cave = new Room(
		"a dark, dank cave.", 
		"This cave is drafty, and the walls slimy. On the floor there is a pebble.",
		[pebble, "torch"]
		);

	var currentRoom = cave;

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
			for (var i = currentRoom.things.length - 1; i >= 0; i--) {
				if (currentRoom.things[i].itemName == optionalObject) {
					$('.message').text(currentRoom.things[i].itemDesc);
				}
				else {
					$('.message').text("Not much to see here.");
				}
			};
			for (var i = backpack.length - 1; i >= 0; i--) {
				if (backpack[i].itemName == optionalObject) {
					$('.message').text(backpack[i].itemDesc + " It is in your backpack.");
				}
				else {
					$('.message').text("Not much to see here.");
				}
			};
		}
		else {
			$('.message').text(currentRoom.lDesc);
		}
	}
	// Take Command function
	window.take = function(optionalObject) {
		if(optionalObject) {
			for (var i = currentRoom.things.length - 1; i >= 0; i--) {
				if (currentRoom.things[i].itemName == optionalObject) {
					$('.message').text("You take the " + currentRoom.things[i].itemName + ".");
					backpack.push(currentRoom.things[i]);
					currentRoom.things.splice(i,1);
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
			for (var i = backpack.length - 1; i >= 0; i--) {
				tempBackpack.push(backpack[i].itemName);
			};
			$('.message').text("You have " + tempBackpack.join(', '));
		}
		else {
			$('.message').text("Your inventory is empty.");
		}
	}

});

