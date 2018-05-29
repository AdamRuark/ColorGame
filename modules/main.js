var Game = require('./game.js');
var LevelGenerator = require('./levelGenerator');

var curLevel = 1;

Game.init();
async function levelLoop() {
	var response = await fetch('/level/' + curLevel);
	var data = await response.json();

	// No possible level
	if(Object.keys(data).length == 0) {
		window.open('index.html', '_self');
	}
	var level = LevelGenerator.generate(data);

	Game.newLevel(level);
	interval = setInterval(() => {
		Game.refresh();
		if(Game.levelEnd) {
			clearInterval(interval);
			curLevel++;
			levelLoop();
		}
	}, 16.67);
}

levelLoop();




