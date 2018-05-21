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
},{"./player.js":3}],2:[function(require,module,exports){
Game = require('./game.js');

Game.init();
Game.start();

},{"./game.js":1}],3:[function(require,module,exports){
module.exports = {

	init: function(x, y) {
		this.x = x;
		this.y = y;
	},

	move: function(key) {
		console.log(key);
		switch(key) {
			case 'w':
				this.y -= 10;
				break;
			case 'a':
				this.x -= 10;
				break;
			case 's':
				this.y += 10;
				break;
			case 'd':
				this.x += 10;
				break;
		}
	}

};
},{}]},{},[1,2,3]);
