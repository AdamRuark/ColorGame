// var uglify = require('uglify-es');
var browserify = require('browserify')();
var fs = require('fs');
var path = require('path');

module.exports = {
	compress: function() {
		// var code = {};

		files = fs.readdirSync(__dirname);
		for (var i = 0; i < files.length; i++) {
			files[i] = './modules/' + files[i];
		} 
		browserify.add(files);
		browserify.exclude('modules/compress.js');
		browserify.bundle().pipe('test.js');

		// for(var i = 0; i < files.length; i++) {
		// 	if(files[i] != 'compress.js') {
		// 		// code[files[i]] = fs.readFileSync(path.join(__dirname, files[i]), 'utf8');
		// 		browserify.add(file[i]);
		// 	}
		// }
		// code['index.js'] = fs.readFileSync('public/index.js', 'utf8');

		// fs.writeFileSync('public/test.js', uglify.minify(code).code);
		// var result = uglify.minify(code);
		// console.log(result.code);
	}
}