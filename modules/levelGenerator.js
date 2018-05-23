var LevelObjects = require('./levelObject');

module.exports = {
	objects: [],

	pattern: {
		'x': 'black',
		'r': 'red',
		'b': 'blue',
		'g': 'green',
		'y': 'yellow',
		'o': 'orange'

	},

	init: function(level) {
		var self = this;
		fetch(level).then(function(response) {
			response.json().then(function(data) {
				self.generate(data);
			})
		});
	},

	generate: function(data) {
		// console.log(this.objects);
		for(var i = 0; i < data.length; i++){
			for(var j = 0; j < data[i].length; j++){
				if(data[i][j] != '.') {
					// console.log(data[i][j] + " .");
					// console.log(i + ", " + j);
					var color = this.pattern[data[i][j]];
					this.objects.push(LevelObjects.newObject(j * 50, i * 50, 50, 50, color));
				}

			}
		}
		console.log(data[0][0].charCodeAt(0));
		console.log(".".charCodeAt(0));
	}
};