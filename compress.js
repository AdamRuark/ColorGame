var browserify = require('browserify')();
var fs = require('fs');
var path = require('path');

module.exports = {
	compress: function(callback) {
		var bundlefs = fs.createWriteStream(path.join(__dirname, '/public/index.min.js'))
		files = fs.readdirSync(path.join(__dirname, '/modules/'));

		for (var i = 0; i < files.length; i++) {
			files[i] = './modules/' + files[i];
		}
		files[files.length] = './public/index.js';

		browserify.add(files);
		browserify.bundle().pipe(bundlefs);

		bundlefs.on('finish', function() {
			console.log('Compression complete');
			return callback();
		});	
	}
}