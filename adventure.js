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
[-4, -1, +4, +1]

Basic idea for movement. Each room gets an ID that's a number 1-12 laid out
according to the map above. The map legend maps the directions north, east, south, and west to
integers -4, -1, +4, and +1 to "move" to the cell.

In our example, the starting room is room 11. North of room 11 is room 7, thus the -4 assigned to North would take us there.

If a cell doesn't contain a room it is assigned a 0 integer that is checked before movement is calculated.



*/

$(document).ready(function() {

/* Order Matters. Always load items that are required by other items first */
requirejs(['scripts/player','scripts/items','scripts/rooms', 'scripts/commands']);

/* Player variables have moved to player.js */

/* Items have moved to items.js */

/* Rooms have moved to rooms.js */

/* Commands have moved to commands.js */

/*
Inputs
================================================================================
*/
	$(document).keypress(function(e){
		if(e.which == 13) {
			onSubmit();
			return false;
		}
	});

	function onSubmit() {
		var enteredInputs = $('input').val().split(" ");
		for (var i = 0; i < enteredInputs.length; i++) {
			enteredInputs[i] = enteredInputs[i].toLowerCase();
		};
		var command = enteredInputs[0];
		var modifier = enteredInputs[1];

		if ($.inArray( command, commandArray) > -1) {
			$('.message').text("");
			window[command](modifier);
		}
		else {
			$('.message').text("I don't understand that command.");
		}
		$('input').val("");
	}


});