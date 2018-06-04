var path = require('path');
var fs = require('fs');
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var package = require('./compress.js');
var papa = require('papaparse');

var numLevels = fs.readdirSync(path.join(__dirname, '/levels/')).length - 1;

app.use(express.static('public'));

app.get('/level/:num', function(req, res) {
	console.log('Get level: ' + req.params.num);
	if(req.params.num > numLevels) {
		// Send empty level
		res.send({});
	}
	else {
		var level = path.join(__dirname, '/levels/level' + req.params.num + '.csv');
		var stream = fs.createReadStream(level);
		stream.on('open', () => {
			papa.parse(stream, {
				complete: function(results, file) {
					res.send(results.data);
				}
			});
		});
	}

	
});

package.compress(function() { 
	app.listen(port, function() {
		console.log("Started on port: " + port + "\n");
	})
});
