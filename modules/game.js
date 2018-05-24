var Player = require('./player.js');

module.exports = {
	canvas: document.getElementById('canvas'),
	context: document.getElementById('canvas').getContext('2d'),
	level: null,

	init: function() {
		// Set up canvas
		this.canvas.width = 1000;
		this.canvas.height = 1000;
		this.fillStyle = 'black';

		// Bind keys
		this.canvas.addEventListener('keydown', function(event) {
			event.preventDefault();
			switch(event.key){
				case 'a' :
				case 'd' :
				case 'ArrowLeft' :
				case 'ArrowRight' :
					Player.changeDirection(event.key);
					break;
				case ' ':
					Player.playerJump();
			}
		});
		this.canvas.addEventListener('keyup', function(event) {
			var key = event.key;
			if(key == 'ArrowLeft') {
				key = 'a';
			}
			else if(key == 'ArrowRight') {
				key = 'd';
			}

			if(key == Player.direction){
				Player.stop();
			}
		});

		// Focus game area
		this.canvas.focus();
	},

	newLevel: function(level) {
		this.level = level.objects;
		Player.init(level.spawn, 25, 25);
		console.log(Player.x + ", " + Player.y);
	},

	start: function() {
		this.interval = setInterval(() => this.refresh(), 16.67);
	},

	stop: function() {
		clearInterval(this.interval);
	},

	refresh: function() {
		// Clear previous contents
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

		// Update positions
		if(!this.horizontalCollisionHandler()) {
			Player.playerMove();
		}
		if(!this.verticalCollisionHandler()) {
			Player.gravity();
		}

		// Draw the new changes
		this.context.fillStyle = Player.color;
		this.context.fillRect(Player.x, Player.y, Player.width, Player.height);

		for(var i = 0; i < this.level.length; i++){
			var obj = this.level[i];
			this.context.fillStyle = obj.color;
			this.context.fillRect(obj.x, obj.y, obj.width, obj.height);
		}
	},

	horizontalCollisionHandler() {
		// Canvas collision left/right
		if(Player.direction == 'a' && Player.x <= 0) {
			Player.x = 0;
			return true;
		}
		else if(Player.direction == 'd' && Player.x + Player.width >= this.canvas.width) {
			Player.x = this.canvas.width - Player.width;
			return true;
		}

		// Level collision left/right
		var playerBot = Player.y + Player.height;
		var playerTop = Player.y;
		var playerLeft = Player.x;
		var playerRight = Player.x + Player.width;

		for(var i = 0; i < this.level.length; i++){
			var obj = this.level[i];
			var boxBot = obj.y + obj.height;
			var boxTop = obj.y;
			var boxLeft = obj.x;
			var boxRight = obj.x + obj.width;

			// top/bottom
			if(playerTop < boxBot && playerBot > boxTop) {
				//player left
				if(playerRight >= boxLeft && playerLeft <= boxLeft && Player.direction == 'd') {
					Player.x = boxLeft - Player.width;
					return true;
				}
				//player right
				else if(playerLeft <= boxRight && playerRight >= boxRight && Player.direction == 'a') {
					Player.x = boxRight;
					return true;
				}
			}
		}
		return false;
	},

	verticalCollisionHandler() {
		// Canvas collision top/bottom
		if(Player.velocity < 0 && Player.y + Player.height >= this.canvas.height) {
			Player.resetJump();
			Player.y = this.canvas.height - Player.height;
			return true;
		}
		else if (Player.velocity >= 0 && Player.y <= 0) {
      		Player.y = 0;
			return true;
		}

		// Level collision top/bottom
		var playerBot = Player.y + Player.height;
		var playerTop = Player.y;
		var playerLeft = Player.x;
		var playerRight = Player.x + Player.width;

		for(var i = 0; i < this.level.length; i++){
			var obj = this.level[i];
			var boxBot = obj.y + obj.height;
			var boxTop = obj.y;
			var boxLeft = obj.x;
			var boxRight = obj.x + obj.width;

			// left/right
			if(playerLeft < boxRight && playerRight > boxLeft) {
				// player bottom
				if(playerBot >= boxTop && playerTop <= boxTop && Player.velocity < 0){
					Player.y = boxTop - Player.height;
					Player.velocity = 0;
					Player.resetJump();
					return true;
				}
				// player top
				else if(playerTop <= boxBot && playerBot >= boxBot && Player.velocity > 0) {
					Player.y = boxBot;
					Player.velocity  = 0;
					return true;
				}
			}
		}
		return false;
	}
};