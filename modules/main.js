var Game = require('./game.js');
var LevelGenerator = require('./levelGenerator');

var numLevels = 1;
Game.init();

for(var i = 0; i < numLevels; i++) {
	LevelGenerator.init('/level/' + (i+1), function(level){
		Game.newLevel(level);
		Game.start();
	});
}



