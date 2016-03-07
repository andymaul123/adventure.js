"use strict";

var canBeDescribedDeadOrAlive = function canBeDescribedDeadOrAlive(state) {
    return {
        description: function() {
            if(state.monsterDefense > 0){
                return state.aliveDesc;
            } else {
                return state.deadDesc;
            }
        }
    }
}

function Monster(monsterName, monsterDesc, monsterInRoomDesc, monsterDefense, monsterAttack, monsterDeadDesc) {
	var monsterState = {
	    name: monsterName,
	    aliveDesc: monsterDesc,
	    monsterInRoomDesc: monsterInRoomDesc,
	    monsterDefense: monsterDefense,
	    monsterAttack: monsterAttack,
	    deadDesc: monsterDeadDesc
	};

	return Object.assign(monsterState,
	            canBeIdentifiedByName(monsterState),
	            canBeDescribedDeadOrAlive(monsterState));
}
var troll = new Monster(
    "troll",
    "A large, mean troll.",
    "The dungeon's warden, a grotesque troll, glares menacingly at you. In its left hand is a wooden club with nasty iron hooks at the end.",
    "10",
    "5",
    "The troll lies face-down in a pool of crimson."
);