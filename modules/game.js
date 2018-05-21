var Player = require('./player.js');

module.exports = {
	canvas: document.getElementById('canvas'),
	context: document.getElementById('canvas').getContext('2d'),

	init: function() {
		// Set up canvas
		this.canvas.width = 1000;
		this.canvas.height = 1000;
		this.context.globalAlpha = 1;
		this.fillStyle = 'blue';

		// Bind keys
		this.canvas.addEventListener('keypress', function(event) {
			switch(event.key){
				case 'a' :
				case 'd' :
					Player.changeDirection(event.key);
					break;
				case ' ':
					console.log("Jump");
			}
		});
		this.canvas.addEventListener('keyup', function(event) {
			if(event.key == Player.direction){
				Player.stop();
			}
		});

		// Set up player
		Player.init(100, 100, 20, 20);

		// focus game area
		this.canvas.focus();
	},

	start: function() {
		this.interval = setInterval(() => this.refresh(), 16.67);
	},

	stop: function() {
		clearInterval(this.interval);
	},

	refresh: function() {
		//clear previous contents
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

		// Update positions
		if(!this.collisionCheck()) {
			Player.playerMove();
		}

		/*if(!this.gravityCollision()) {
			Player.gravity();
		}*/

		// Draw the new changes
		this.context.fillRect(Player.x, Player.y, Player.width, Player.height);
	},

	collisionCheck() {
		// Return true if a collision occurs, false otherwise
		// console.log(Player.x + ", " + Player.y);
		if(Player.direction == 'a' && Player.x <= 0) {
			return true;
		}
		else if(Player.direction == 'd' && Player.x + Player.width >= this.canvas.width) {
			return true;
		}
		return false;
	},

	gravityCollision() {
		if(Player.velocity < 0 && Player.y + Player.height >= this.canvas.height){
			return true;
		}
		else if (Player.velocity >= 0 && Player.y <= 0) {
			return true;
		}
		return false;
	}


};