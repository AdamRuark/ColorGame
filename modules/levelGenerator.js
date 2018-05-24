var LevelObjects = require('./levelObject');

module.exports = {
	objects: [],
	spawn: {},

	pattern: {
		'x': 'black',
		'r': 'red',
		'b': 'blue',
		'g': 'green',
		'y': 'yellow',
		'o': 'orange'

	},

	init: function(level, callback) {
		var self = this;
		fetch(level).then(function(response) {
			response.json().then(function(data) {
				self.generate(data);
				callback();
			})
		});
	},

	generate: function(data) {
		for(var i = 0; i < data.length; i++){
			for(var j = 0; j < data[i].length; j++){
				// Get spawn point
				if(data[i][j] == 's') {
					this.spawn.x = j * 50;
					this.spawn.y = i * 50;
				}
				else if(data[i][j] != '.') {
					var color = this.pattern[data[i][j]];
					this.objects.push(LevelObjects.newObject(j * 50, i * 50, 50, 50, color));
				}

			}
		}
	}
};