var LevelObjects = require('./levelObject');

module.exports = {
	objects: [],

	init: function(level) {
		var self = this;
		fetch(level).then(function(response) {
			response.json().then(function(data) {
				self.generate(data);
			})
		});
	},

	generate: function(data) {
		for(var i = 0; i < data.length; i++){
			for(var j = 0; j < data[i].length; j++){
				var color;
				if(data[i][j] == '.'){
					continue;
				}

				if(data[i][j] == 'x'){
					color = 'black'
				}
				else if(data[i][j] == 'r'){
					color = 'red'
				}
				this.objects.push(LevelObjects.newObject(j*50 ,i*50,50 ,50 , color))

			}
		}
	}
};