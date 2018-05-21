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

	stop: function() {
		this.direction = null;
	}
};