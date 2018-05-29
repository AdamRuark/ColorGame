var fs = require('fs');

module.exports = {
	newObject: function(x, y, width, height, color, type) {
		var obj = {
			width: width,
			height: height,
			x: x,
			y: y,
			color: color,
			type: type,
			active: true
		};
		return obj;
	}
};