module.exports = {
	objects: [],
	newObj: function (x, y, width, height) {
		var obj = {
			width: width,
			height: height,

			coords: [
				[x,y],
				[x + width, y],
				[x + width, y + height],
				[x, y + height]
			]

		};
		this.objects.push(obj);
	}

};