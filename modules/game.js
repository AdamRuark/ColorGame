var Player = require('./player.js');
var Palette = require('./palette.js');


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
			switch(event.key){
				case 'a' :
				case 'd' :
				case 'ArrowLeft' :
				case 'ArrowRight' :
					Player.changeDirection(event.key);
					break;
				case ' ':
					event.preventDefault();
					Player.playerJump();
					break;
				case 'w':
				case 's':
					Palette.changeActive(event.key);
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
		this.level = level[0];
		Palette.init(level[1]);
		this.levelEnd = false;
		this.canvas.style.backgroundColor = 'white';
		Player.init(this.level.spawn, 25, 25);
	},

	refresh: function() {
		// Clear previous contents
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

		if(this.tokenCollisionHandler()){
			this.canvas.style.backgroundColor = Palette.getActive();
		}

		// Update positions
		if(!this.horizontalCollisionHandler()) {
			Player.playerMove();
		}
		if(!this.verticalCollisionHandler()) {
			Player.gravity();
		}

		// Draw player
		this.context.fillStyle = Player.color;
		this.context.fillRect(Player.x, Player.y, Player.width, Player.height);

		// Draw tokens
		for(var i = 0; i < Palette.tokens.length; i++) {
			var obj = Palette.tokens[i];
			var rad = obj.width/2;
			this.context.fillStyle = obj.color;
			this.context.beginPath();
			this.context.arc(obj.x + rad, obj.y + rad, rad, 0, 2*Math.PI);
			this.context.fill();
			this.context.closePath();
		}
		
		// Draw terrain
		for(var i = 0; i < this.level.objects.length; i++){
			var obj = this.level.objects[i];
			if(!obj.active) {
				continue;
			}
			this.context.fillStyle = obj.color;
			this.context.fillRect(obj.x, obj.y, obj.width, obj.height);
		}

		// Change the active blocks and colors
		this.canvas.style.backgroundColor = Palette.getActive();
		this.changeBlocks(Palette.getActive());
	},

	tokenCollisionHandler: function() {
		var playerBot = Player.y + Player.height;
		var playerTop = Player.y;
		var playerLeft = Player.x;
		var playerRight = Player.x + Player.width;

		for(var i = 0; i < Palette.tokens.length; i++) {
			var obj = Palette.tokens[i];
			var boxBot = obj.y + obj.height;
			var boxTop = obj.y;
			var boxLeft = obj.x;
			var boxRight = obj.x + obj.width;

			if(playerTop < boxBot && playerBot > boxTop && playerLeft < boxRight && playerRight > boxLeft) {
				Palette.addToCollection(i);
				i--;
				return true;
			}
		}
		return false;
	},

	horizontalCollisionHandler: function() {
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

		for(var i = 0; i < this.level.objects.length; i++){
			var obj = this.level.objects[i];
			var boxBot = obj.y + obj.height;
			var boxTop = obj.y;
			var boxLeft = obj.x;
			var boxRight = obj.x + obj.width;

			if(obj.active == false) {
				continue;
			}

			// top/bottom
			if(playerTop < boxBot && playerBot > boxTop) {
				//player left
				if(playerRight >= boxLeft && playerLeft <= boxLeft && Player.direction == 'd') {
					Player.x = boxLeft - Player.width;
					if(obj.type == 'exit') {
						this.levelEnd = true;
					}
					return true;
				}
				//player right
				else if(playerLeft <= boxRight && playerRight >= boxRight && Player.direction == 'a') {
					Player.x = boxRight;
					if(obj.type == 'exit') {
						this.levelEnd = true;
					}
					return true;
				}
			}
		}
		return false;
	},

	verticalCollisionHandler: function() {
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

		for(var i = 0; i < this.level.objects.length; i++){
			var obj = this.level.objects[i];
			var boxBot = obj.y + obj.height;
			var boxTop = obj.y;
			var boxLeft = obj.x;
			var boxRight = obj.x + obj.width;

			if(!obj.active) {
				continue;
			}

			// left/right
			if(playerLeft < boxRight && playerRight > boxLeft) {
				// player bottom
				if(playerBot >= boxTop && playerTop <= boxTop && Player.velocity < 0){
					Player.y = boxTop - Player.height;
					Player.velocity = 0;
					Player.resetJump();
					if(obj.type == 'exit') {
						this.levelEnd = true;
					}
					return true;
				}
				// player top
				else if(playerTop <= boxBot && playerBot >= boxBot && Player.velocity > 0) {
					Player.y = boxBot;
					Player.velocity  = 0;
					if(obj.type == 'exit') {
						this.levelEnd = true;
					}
					return true;
				}
			}
		}
		return false;
	},

	changeBlocks: function(color) {
		for(var i = 0; i < this.level.objects.length; i++) {
			this.level.objects[i].active = !(this.level.objects[i].color == color);
		}
	}
};