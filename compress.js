var browserify = require('browserify')();
var fs = require('fs');
var path = require('path');

module.exports = {
	compress: function(callback) {
		var bundlefs = fs.createWriteStream(path.join(__dirname, '/public/index.js'))
		files = fs.readdirSync(path.join(__dirname, '/modules/'));

		for (var i = 0; i < files.length; i++) {
			files[i] = './modules/' + files[i];
		}

		browserify.add(files);
		browserify.bundle().pipe(bundlefs);

		bundlefs.on('finish', function() {
			console.log('Compression complete');
			return callback();
		});	
	},
};

if(process.argv[2] == 'manual'){
	module.exports.compress(function(){});
}
