(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
		if(!this.wallCollision()) {
			Player.playerMove();
		}
		if(!this.gravityCollision()) {
			Player.gravity();
		}

		console.log(Player.velocity);

		// Draw the new changes
		this.context.fillRect(Player.x, Player.y, Player.width, Player.height);
	},

	wallCollision() {
		// Return true if a collision occurs, false otherwise
		if(Player.direction == 'a' && Player.x <= 0) {
			return true;
		}
		else if(Player.direction == 'd' && Player.x + Player.width >= this.canvas.width) {
			return true;
		}
		return false;
	},

	gravityCollision() {
		if(Player.velocity < 0 && Player.y + Player.height >= this.canvas.height) {
			Player.resetJump();
			return true;
		}
		else if (Player.velocity >= 0 && Player.y <= 0) {
			return true;
		}
		return false;
	}


};
},{"./player.js":3}],2:[function(require,module,exports){
Game = require('./game.js');

Game.init();
Game.start();

},{"./game.js":1}],3:[function(require,module,exports){
module.exports = {

	direction: null,

	init: function(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.canJump = true;
		this.velocity = 0;
	},

	changeDirection: function(key) {
		this.prev_dir = this.direction;
		this.direction = key;
	},

	playerMove: function() {
		var step = 10;
		switch(this.direction) {
			case 'a':
				this.x -= step;
				break;
			case 'd':
				this.x += step;
				break;
			default:
				// Do nothing
				break;
		}

	},

	playerJump: function() {
		if(this.canJump){
			this.canJump = false;
			this.velocity = 10;
		}
	},

	stop: function() {
		this.direction = null;
	},
	
	resetJump: function() {
		this.canJump = true;
	},

	gravity: function() {
		//nothing yet
	}
};
},{}]},{},[1,2,3]);
