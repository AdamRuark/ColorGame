module.exports = {

	canvas: document.getElementById('canvas'),
	context: this.canvas.getContext('2d'),

	init: function() {
		this.canvas.width = 1000;
		this.canvas.height = 1000;
		this.context.globalAlpha = 1;
		this.fillStyle = 'black';
	},
	start: function() {
		this.interval = setInterval(this.refresh, 16.67);
	},

	refresh: function() {
		this.context.fillRect(10, 10, 100, 100);
		console.log('Hello');
	}


};