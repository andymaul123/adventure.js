function Monster(monsterName, monsterDesc, monsterInRoomDesc, monsterDefense, monsterAttack, monsterDeadDesc) {
	this.monsterName = monsterName;
	this.monsterDesc = monsterDesc;
	this.monsterInRoomDesc = monsterInRoomDesc;
	this.monsterDefense = monsterDefense;
	this.monsterAttack = monsterAttack;
	this.monsterDeadDesc = monsterDeadDesc;
}
var troll = new Monster(
	"troll",
	"A large, mean troll.",
	"The dungeon's warden, a grotesque troll, glares menacingly at you. In it's left hand is a wooden club with nasty iron hooks at the end.",
	"10",
	"5",
	"The troll lies face-down in a pool of crimson."
	);