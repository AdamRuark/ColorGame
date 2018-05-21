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
		this.fillStyle = 'black';

		// Bind keys
		this.canvas.addEventListener('keypress', function(event) {
			switch(event.key){
				case 'w' :
				case 'a' :
				case 's' :
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
		if(!this.collisionCheck()){
			Player.move();
		}


		// Draw the new changes
		this.context.fillRect(Player.x, Player.y, Player.width, Player.height);
	},

	collisionCheck(){
		// Return true if a collision occurs, false otherwise
		// console.log(Player.direction);
		if(Player.direction == 'w' && Player.y <= 0) {
			return true;
		}
		else if(Player.direction == 'a' && Player.x <= 0) {
			return true;
		}
		else if(Player.direction == 's' && Player.y + Player.height >= this.canvas.height) {
			return true;
		}
		else if(Player.direction == 'd' && Player.x + Player.width >= this.canvas.width) {
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
	},

	changeDirection: function(key) {
		this.prev_dir = this.direction;
		this.direction = key;
	},

	move: function() {
		var step = 7;
		switch(this.direction) {
			case 'w':
				this.y -= step;
				break;
			case 'a':
				this.x -= step;
				break;
			case 's':
				this.y += step;
				break;
			case 'd':
				this.x += step;
				break;
			default:
				// Do nothing
				break;
		}
	},

	stop: function() {
		this.direction = null;
	}
};
},{}]},{},[1,2,3]);
