var Game = require('./game.js');
var LevelGenerator = require('./levelGenerator');

LevelGenerator.init('/level/1');
Game.init();
Game.newLevel(LevelGenerator.objects);

Game.start();
