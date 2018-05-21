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
		if(this.direction == 'a') {
			this.x -= step;
		}
		else if(this.direction == 'd') {
			this.x += step;
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