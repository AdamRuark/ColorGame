module.exports = {

	direction: null,

	init: function(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	},

	changeDirection: function(key) {
		this.direction = key;
	},

	move: function() {
		var step = 5;
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