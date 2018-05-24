module.exports = {

	color: 'black',
	direction: null,
	maxSpeed: 15,

	init: function(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.velocity = 0;
		this.width = width;
		this.height = height;
		this.canJump = false;
		this.velocity = 0;
	},

	changeDirection: function(key) {
		if(key == 'ArrowLeft') {
			this.direction = 'a';
		}
		else if (key == 'ArrowRight') {
			this.direction = 'd';
		}
		else {
			this.direction = key;		
		}
	},

	playerMove: function() {
		switch(this.direction) {
			case 'a' :
			case 'ArrowLeft' :
				this.x -= this.maxSpeed/2;
				break;
			case 'd':
			case 'ArrowRight' :
				this.x += this.maxSpeed/2;
				break;
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