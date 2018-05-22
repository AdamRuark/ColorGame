var path = require('path');
var fs = require('fs');
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var package = require('./compress.js');
var papa = require('papaparse')

app.use(express.static('public'));

app.get('/level/:num', function(req, res) {
	console.log('get request');
	var level = path.join(__dirname, '/levels/level' + req.params.num + '.csv');
	var stream = fs.createReadStream(level);
	stream.on('open', function() {
		papa.parse(stream, {
			complete: function(results, file) {

				/*if(results.data.length != 100 && results.data[0].length != 100) {
					// Send default value (change to something else later)
					res.send(null);
				}
				else {
					res.send(results.data);
				}*/
				res.send(results.data);


			}
		})
	})

});

package.compress(function() { 
	app.listen(port, function() {
		console.log("Started on port: " + port + "\n");
	})
});
