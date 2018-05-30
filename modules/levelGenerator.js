var LevelObjects = require('./levelObject');

module.exports = {
	pattern: {
		'x': 'black',
		'r': '#C63B3B',
		'b': '#247777',
		'g': '#2F9F2F',
		'o': '#C67A3B',
		'e': 'grey'
	},

	generate: function(data) {
		var level = {
			spawn: {},
			objects: [],
			tokens: [],
			curtok: null
		};
		for(var i = 0; i < data.length; i++){
			for(var j = 0; j < data[i].length; j++){
				// Get spawn point
				if(data[i][j] == 's') {
					level.spawn.x = j * 50;
					level.spawn.y = i * 50;
				}
				
				else if(data[i][j] != '.') {
					var type = null;
					if(data[i][j] == 'e'){
						type = 'exit';
					}
					else if(data[i][j].includes('t')){
						type = 'token';
						data[i][j] = data[i][j].charAt(1);
					}
					var color = this.pattern[data[i][j]];
					if(type == 'token') {
						level.tokens.push(LevelObjects.newObject(j * 50, i * 50, 50, 50, color, type));
					}
					else {
						level.objects.push(LevelObjects.newObject(j * 50, i * 50, 50, 50, color, type));
					}
				}
			}
		}
		return level;
	}
};