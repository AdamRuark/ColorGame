var fs = require('fs');

module.exports = {
	newObject: function (x, y, width, height, color) {
		var obj = {
			width: width,
			height: height,
			x: x,
			y: y,
			color: color
		};
		return obj;
	}
};