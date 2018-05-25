var Game = require('./game.js');
var LevelGenerator = require('./levelGenerator');

var curLevel = 1;
var numLevels = 2;

Game.init();
async function levelLoop() {
	var response = await fetch('/level/' + curLevel);
	var data = await response.json();
	var level = LevelGenerator.generate(data);

	Game.newLevel(level);
	interval = setInterval(() => {
		Game.refresh();
		if(Game.levelEnd) {
			clearInterval(interval);
			curLevel++;
			if(curLevel <= numLevels){
				levelLoop();
			}
		}
	}, 16.67);
}

levelLoop();




