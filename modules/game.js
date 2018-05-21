var Player = require('./player.js');

module.exports = {
	canvas: document.getElementById('canvas'),
	context: document.getElementById('canvas').getContext('2d'),

	init: function() {
		// Set up canvas
		this.canvas.width = 1000;
		this.canvas.height = 1000;
		this.context.globalAlpha = 1;
		this.fillStyle = 'black';

		// Bind keys
		this.canvas.addEventListener('keypress', function(event) {
			switch(event.key){
				case 'w' :
				case 'a' :
				case 's' :
				case 'd' :
				case ' ' :
					Player.changeDirection(event.key);
			}
		});
		this.canvas.addEventListener('keyup', function(event) {
			if(event.key == Player.direction){
				Player.stop();
			}
		});

		// Set up player
		Player.init(10, 10, 20, 20);

		// focus game area
		this.canvas.focus();
	},

	start: function() {
		// Fuck js. 'this' loses scope in refresh(), so I have to reference an anonymous function to keep scope
		this.interval = setInterval(() => this.refresh(), 10);
	},

	stop: function() {
		clearInterval(this.interval);
	},

	refresh: function() {
		//clear previous contents
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

		// Update positions
		Player.move();

		// Draw the new changes
		this.context.fillRect(Player.x, Player.y, Player.width, Player.height);
	}


};