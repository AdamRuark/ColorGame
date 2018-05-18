var path = require('path');
var fs = require('fs');
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var package = require('./compress.js');

app.use(express.static('public'));

/*app.get('/', function(req, res){
	res.sendFile(path.join(__dirname, '/public/index.html'));
	// res.sendFile(path.join(__dirname, '/public/style.css'));
});*/


package.compress(function() { 
	app.listen(port, function() {
		console.log("Started on port: " + port + "\n");
	})
});

/*app.listen(port, function(){
	console.log("Started on port: " + port + "\n");
	package.compress();
});*/