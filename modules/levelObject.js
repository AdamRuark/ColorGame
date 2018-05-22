module.exports = {
	objects: [],
	newObj: function (x, y, width, height) {
		var obj = {
			width: width,
			height: height,
			x: x,
			y: y
		};
		this.objects.push(obj);
	}

};