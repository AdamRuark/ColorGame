var Game = require('./game.js');
var LevelGenerator = require('./levelGenerator');

var currentLevel = 1;
Game.init();

LevelGenerator.init('/level/' + currentLevel, function(level){
	Game.newLevel(level);
});

Game.start();
