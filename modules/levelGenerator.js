var LevelObjects = require('./levelObject');

module.exports = {
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
				callback(self.generate(data));
			})
		});
	},

	generate: function(data) {
		var level = {
			spawn: {},
			objects: []
		};
		for(var i = 0; i < data.length; i++){
			for(var j = 0; j < data[i].length; j++){
				// Get spawn point
				if(data[i][j] == 's') {
					level.spawn.x = j * 50;
					level.spawn.y = i * 50;
				}
				// Get exit
				else if(data[i][j] == 'e') {

				}

				else if(data[i][j] != '.') {
					var color = this.pattern[data[i][j]];
					level.objects.push(LevelObjects.newObject(j * 50, i * 50, 50, 50, color));
				}

			}
		}
		return level;
	}
};