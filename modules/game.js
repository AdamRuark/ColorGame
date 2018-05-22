var Player = require('./player.js');
var LevelObjects = require('./levelObject.js');

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
			event.preventDefault();
			switch(event.key){
				case 'a' :
				case 'd' :
					Player.changeDirection(event.key);
					break;
				case ' ':
					Player.playerJump();
			}
		});
		this.canvas.addEventListener('keyup', function(event) {
			if(event.key == Player.direction){
				Player.stop();
			}
		});

		// Set up player
		Player.init(100, 100, 20, 20);

		// Set up level
		LevelObjects.newObj(300,900,100,100);
		LevelObjects.newObj(600,800,100,500);

		// Focus game area
		this.canvas.focus();
	},

	start: function() {
		// Draw level
		
		this.interval = setInterval(() => this.refresh(), 16.67);
	},

	stop: function() {
		clearInterval(this.interval);
	},

	refresh: function() {
		// Clear previous contents
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

		for(var i = 0; i < LevelObjects.objects.length; i++){
			var obj = LevelObjects.objects[i];
			this.context.fillRect(obj.x, obj.y, obj.width, obj.height);
		}


		// Update positions
		if(!this.horizontalCollisionHandler()) {
			Player.playerMove();
		}
		if(!this.verticalCollisionHandler()) {
			Player.gravity();
		}
		

		// Draw the new changes
		this.context.fillRect(Player.x, Player.y, Player.width, Player.height);


	},

	horizontalCollisionHandler() {
		// Canvas collision left/right
		if(Player.direction == 'a' && Player.x <= 0) {
			return true;
		}
		else if(Player.direction == 'd' && Player.x + Player.width >= this.canvas.width) {
			return true;
		}

		// Level collision left/right
		var playerBot = Player.y + Player.height;
		var playerTop = Player.y;
		var playerLeft = Player.x;
		var playerRight = Player.x + Player.width;

		for(var i = 0; i < LevelObjects.objects.length; i++){
			var obj = LevelObjects.objects[i];
			var boxBot = obj.y + obj.height;
			var boxTop = obj.y;
			var boxLeft = obj.x;
			var boxRight = obj.x + obj.width;

			// top/bottom
			if(playerTop < boxBot && playerBot > boxTop) {
				//player left
				if(playerRight >= boxLeft && playerLeft <= boxLeft && Player.direction == 'd'){
					
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

		for(var i = 0; i < LevelObjects.objects.length; i++){
			var obj = LevelObjects.objects[i];
			var boxBot = obj.y + obj.height;
			var boxTop = obj.y;
			var boxLeft = obj.x;
			var boxRight = obj.x + obj.width;

			// left/right
			if(playerLeft < boxRight && playerRight > boxLeft) {
				// player bottom
				if(playerBot >= boxTop && playerTop <= boxTop){
					Player.y = boxTop - Player.height;
					if(Player.velocity < 0) {
						Player.velocity = 0;
					}
					Player.resetJump();
				}
				// player top
				else if(playerTop <= boxBot && playerBot >= boxBot) {
					Player.y = boxBot;
					Player.velocity *= -1;
				}
			}
		}
		return false;
	}

};