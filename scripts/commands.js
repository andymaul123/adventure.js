"use strict";

var commandArray = ["look", "move", "take", "inventory", "use", "attack", "open"];
// Look Command function
window.look = function(optionalObject) {
    if (currentRoom.pitchBlack && playerHasLight == false){
        $('.message').text("It is too dark to see. Get some light first.");
    }
    else {
        if(optionalObject) {
            var isAThingCounter = false;
            for (var i = 0; i < currentRoom.things.length; i++) {
                if (currentRoom.things[i] == optionalObject) {
                    if(currentRoom.things[i].hasOwnProperty('locked')) {
                        if(currentRoom.things[i].locked) {
                            $('.message').text(currentRoom.things[i].itemDesc + " It is locked.");
                        }
                        else {
                            $('.message').text(currentRoom.things[i].itemDesc + " It is unlocked.");
                        }
                    }
                    else {
                        $('.message').text(currentRoom.things[i].itemDesc);
                    }
                    isAThingCounter = true;
                }
            };
            for (var i = 0; i < backpack.length; i++) {
                if (backpack[i] == optionalObject) {
                    $('.message').text(backpack[i].itemDesc + " It is in your backpack.");
                    isAThingCounter = true;
                }
            };
            for (var i = 0; i < currentRoom.enemies.length; i++) {
                if (currentRoom.enemies[i] == optionalObject) {
                    $('.message').text(currentRoom.enemies[i].description);
                    isAThingCounter = true;
                }
            };
            if (isAThingCounter == false) {
                $('.message').text("Not much to see here.");
            }
        }
        else {
            $('.message').text(currentRoom.description);
        }
    }
}

// Take Command function
window.take = function(optionalObject) {
    if(optionalObject) {
        for (var i = 0; i < currentRoom.things.length; i++) {
            if (currentRoom.things[i] == optionalObject) {
                if(currentRoom.things[i].canBeTaken) {
                    $('.message').text("You take the " + currentRoom.things[i] + ".");
                    backpack.push(currentRoom.things[i]);
                    currentRoom.things.splice(i,1);
                }
                else {
                    $('.message').text("You can't take that.");
                }
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
            tempBackpack.push(backpack[i]);
        };
        $('.message').text("You have " + tempBackpack.join(', '));
    }
    else {
        $('.message').text("Your inventory is empty.");
    }
}

// Move Command function
window.move = function(requiredObject) {
    if(requiredObject) {
        var convertedDirection;
        switch(requiredObject) {
            case "north":
            case "n":
                convertedDirection = -4;
                break;
            case "east":
            case "e":
                convertedDirection = 1;
                break;
            case "south":
            case "s":
                convertedDirection = 4;
                break;
            case "west":
            case "w":
                convertedDirection = -1;
                break;
            default:
                $('.message').text("That's not a direction.");
                return
        }
        var moveMath = currentRoom.roomID + convertedDirection;
        if (moveMath == currentRoom.roomID) {
            $('.message').text("You can't move that way.");
        }
        else {
            var isThereARoom = 0;
            for (var i = 0; i < allRooms.length; i++) {
                if(allRooms[i].roomID == moveMath) {
                    currentRoom = allRooms[i];
                    isThereARoom++;
                    if (currentRoom.pitchBlack && playerHasLight) {
                        $('.message').text("You are in " + currentRoom.shortDesc);
                    }
                    else if (currentRoom.pitchBlack && playerHasLight == false) {
                        $('.message').text("The room is pitch black.");
                    }
                    else {
                        $('.message').text("You are in " + currentRoom.shortDesc);
                    }
                }
            };
            if(isThereARoom == 0) {
                $('.message').text("You can't go that way.");
            }
        }
    }
    else {
        $('.message').text("Move where?");
    }
}
// Use Command
window.use = function(requiredObject) {
    if (requiredObject) {
        var canUse = false;
        for (var i = 0; i < backpack.length; i++) {
            if (backpack[i] == requiredObject) {
                backpack[i].activate();
                canUse = true;
            }
        };
        for (var i = 0; i < currentRoom.things.length; i++) {
            if (currentRoom.things[i] == requiredObject) {
                currentRoom.things[i].activate();
                canUse = true;
            }
        };

        if (canUse == false) {
            $('.message').text("You don't have a " + requiredObject + " to use.");
        }
    }
    else {
        $('.message').text("Use what?");
    }
}
// Open Command - If object can be opened, activate it
window.open = function(requiredObject) {
    if (requiredObject) {
        for (var i = 0; i < currentRoom.things.length; i++) {
            if (currentRoom.things[i] == requiredObject) {
                if(currentRoom.things[i].hasOwnProperty('isOpen')) {
                    console.log("success");
                    currentRoom.things[i].activate();
                }
                else {
                    $('.message').text("You can't open that.");
                }
            }
        };
    }
    else {
        $('.message').text("Open what?");
    }
}