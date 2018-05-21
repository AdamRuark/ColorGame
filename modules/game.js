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
		console.log('binding keys');
		this.canvas.addEventListener('keydown', function(event) {
			switch(event.key){
				case 'w' :
				case 'a' :
				case 's' :
				case 'd' :
				case ' ' :
					console.log('key pressed');
					Player.move(event.key);
			}

			// Set up player
			Player.init(10, 10);
		});

		// focus game area
		this.canvas.focus();
	},
	start: function() {
		// Fuck js. 'this' loses scope in refresh(), so I have to reference an anonymous function to keep scope
		this.interval = setInterval(() => this.refresh(), 16.67);
	},

	stop: function() {
		clearInterval(this.interval);
	},

	refresh: function() {
		// Update positions

		// Draw the new changes
		this.context.fillRect(Player.x, Player.y, 100, 100);
	}


};