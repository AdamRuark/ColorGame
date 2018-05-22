module.exports = {

	direction: null,
	maxSpeed: 15,

	init: function(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.velocity = 0;
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
		if(this.direction == 'a') {
			this.x -= this.maxSpeed/2;
		}
		else if(this.direction == 'd') {
			this.x += this.maxSpeed/2;
		}

	},

	playerJump: function() {
		if(this.canJump){
			this.canJump = false;
			this.velocity = this.maxSpeed;
		}
	},

	gravity: function() {
		var gravityValue =-1;
		this.y -= this.velocity;
		if(this.velocity > -this.maxSpeed*2){
			this.velocity += gravityValue;
		}
	},

	stop: function() {
		this.direction = null;
	},
	
	resetJump: function() {
		this.canJump = true;
	}

};