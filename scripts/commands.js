"use strict";

var commandArray = ["look", "move", "take", "inventory", "use", "attack", "open"];
window.checkMonsters = function(){
    monstersAliveInRoom = 0;
    if(currentRoom.enemies.length) {
        for (var i = 0; i < currentRoom.enemies.length; i++) {
            if(currentRoom.enemies[i].monsterDefense >= 1) {
                monstersAliveInRoom++;
            }
        }
    }
}
/*
============================================================================================
Command: Look
============================================================================================
*/
window.look = function(optionalObject) {
    if(playerHasLight === false) {
        if(torchIsLit && $.inArray(torch, backpack) >= 0) {
            playerHasLight = true;
        }
    }
    if (currentRoom.pitchBlack && playerHasLight == false){
        $('.message').html("It is too dark to see. Get some light first.");
    }
    else {
        if(optionalObject) {
            var isAThingCounter = false;
            for (var i = 0; i < currentRoom.things.length; i++) {
                if (currentRoom.things[i] == optionalObject) {
                    if(currentRoom.things[i].hasOwnProperty('isLocked')) {
                        if(currentRoom.things[i].isLocked === true) {
                            $('.message').html(currentRoom.things[i].itemDesc + " It is locked.");
                        }
                        else if(currentRoom.things[i].isLocked === false) {
                            $('.message').html(currentRoom.things[i].itemDesc + " It is unlocked.");
                        }
                        else {
                            $('.message').html(currentRoom.things[i].itemDesc);
                        }
                    }
                    else {
                        $('.message').html(currentRoom.things[i].itemDesc);
                    }
                    isAThingCounter = true;
                }
            };
            for (var i = 0; i < backpack.length; i++) {
                if (backpack[i] == optionalObject) {
                    $('.message').html(backpack[i].itemDesc + " It is in your backpack.");
                    isAThingCounter = true;
                }
            };
            for (var i = 0; i < currentRoom.enemies.length; i++) {
                if (currentRoom.enemies[i] == optionalObject) {
                    $('.message').html(currentRoom.enemies[i].description);
                    isAThingCounter = true;
                }
            };
            if (isAThingCounter == false) {
                $('.message').html("Not much to see here.");
            }
        }
        else {
            $('.message').html(currentRoom.description);
        }
    }
}

/*
============================================================================================
Command: Take
============================================================================================
*/
window.take = function(optionalObject) {
    checkMonsters();
    if(optionalObject && monstersAliveInRoom === 0) {
        for (var i = 0; i < currentRoom.things.length; i++) {
            if (currentRoom.things[i] == optionalObject) {
                if(currentRoom.things[i].canBeTaken) {
                    $('.message').html("You take the " + currentRoom.things[i] + ".");
                    backpack.push(currentRoom.things[i]);
                    currentRoom.things.splice(i,1);
                }
                else {
                    $('.message').html("You can't take that.");
                }
            }
            else {
                $('.message').html("You can't take that.");
            }
        };
    }
    else if(optionalObject && monstersAliveInRoom >= 1) {
        for (var i = 0; i < currentRoom.enemies.length; i++) {
            $('.message').html('The ' + currentRoom.enemies[i].name + ' attacks you!');
            healthPoints = healthPoints - currentRoom.enemies[i].monsterAttack;
            console.log('Player health is ' + healthPoints);
        }
    }
    else {
        $('.message').html("Take what?");
    }
}

/*
============================================================================================
Command: Inventory
============================================================================================
*/
window.inventory = function() {
    if(backpack.length > 0) {
        var tempBackpack = [];
        for (var i = 0; i < backpack.length; i++) {
            tempBackpack.push(backpack[i]);
        };
        $('.message').html("You have " + tempBackpack.join(', '));
    }
    else {
        $('.message').html("Your inventory is empty.");
    }
}

/*
============================================================================================
Command: Move
============================================================================================
*/
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
                $('.message').html("That's not a direction.");
                return
        }
        var moveMath = currentRoom.roomID + convertedDirection;
        var blockedMove = false;
        for (var i = 0; i < currentRoom.things.length; i++) {
            if(currentRoom.things[i].directionBlocked === requiredObject) {
                if(currentRoom.things[i].isOpen === false) {
                    blockedMove = true;
                }
            }
        }
        if (moveMath == currentRoom.roomID) {
            $('.message').html("You can't move that way.");
        }
        else {
            var isThereARoom = 0;
            for (var i = 0; i < allRooms.length; i++) {
                if(allRooms[i].roomID == moveMath) {
                    isThereARoom++;
                    if(blockedMove === false) {
                        if(playerHasLight === false) {
                            if(torchIsLit && $.inArray(torch, backpack) >= 0) {
                                playerHasLight = true;
                            }
                        }
                        currentRoom = allRooms[i];
                        if (currentRoom.pitchBlack && playerHasLight) {
                            $('.message').html("You are in " + currentRoom.shortDesc);
                        }
                        else if (currentRoom.pitchBlack && playerHasLight == false) {
                            $('.message').html("The room is pitch black.");
                        }
                        else {
                            $('.message').html("You are in " + currentRoom.shortDesc);
                        }
                    }
                    else if(blockedMove === true){
                        $('.message').html("That way is currently blocked.");
                    }
                }
            };
            if(isThereARoom == 0) {
                $('.message').html("You can't go that way.");
            }
        }
    }
    else {
        $('.message').html("Move where?");
    }
}
/*
============================================================================================
Command: Use
============================================================================================
*/
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
            $('.message').html("You don't have a " + requiredObject + " to use.");
        }
    }
    else {
        $('.message').html("Use what?");
    }
}
/*
============================================================================================
Command: Open
============================================================================================
*/
window.open = function(requiredObject) {
    if (requiredObject) {
        for (var i = 0; i < currentRoom.things.length; i++) {
            if (currentRoom.things[i] == requiredObject) {
                if(currentRoom.things[i].hasOwnProperty('isOpen')) {
                    currentRoom.things[i].activate();
                }
                else {
                    $('.message').html("You can't open that.");
                }
            }
        };
    }
    else {
        $('.message').html("Open what?");
    }
}
/*
============================================================================================
Command: Attack
============================================================================================
*/
window.attack = function(optionalObject) { // WIP
    if (optionalObject && monstersAliveInRoom >= 1 ) {
        if($.inArray(sword, backpack)) {
            for (var i = 0; i < currentRoom.enemies.length; i++) {
                if(currentRoom.enemies[i].monsterDefense > 0) {
                    currentRoom.enemies[i].monsterDefense -= 5;
                     if(currentRoom.enemies[i].monsterDefense <= 0) {
                        $('.message').html("With a final swing the " + currentRoom.enemies[i] + " falls to the floor, dead.");
                     }
                     else {
                        $('.message').html("You swing your sword at the " + currentRoom.enemies[i] + "!");
                     }
                }
                else {
                    $('.message').html("The " + currentRoom.enemies[i] + " is already dead.");
                }
            }
        }
        else if($.inArray(knife, backpack)) {
            weaponUsed = knife;
        }
        else {
            $('.message').html('You don\'t have a weapon to attack with!');
            return;
        }
    }
    else {
        $('.message').html("Open what?");
    }
}















