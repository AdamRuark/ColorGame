var Game = require('./game.js');
var LevelGenerator = require('./levelGenerator');

Game.init();


console.log("Start");
/*LevelGenerator.init('/level/' + 1, function(level){
	Game.newLevel(level);
	Game.start();
	return new Promise(resolve => {
		resolve('resolved');
	});
});*/

async function levelLoop() {
	var i = 1;
	var numLevels = 1;

	var temp = await LevelGenerator.init('/level/' + i, function(level){
		Game.newLevel(level);
		Game.start();
	});
}

levelLoop();




