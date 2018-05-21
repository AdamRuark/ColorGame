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