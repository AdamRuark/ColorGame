module.exports = {
	div: document.getElementById('color-wheel'),
	tokens: [],
	collection: [],
	activeToken: null,
	init: function(tokens) {
		this.tokens = tokens;
		this.collection = ['white'];
		this.activeToken = 0;

		// TODO: Add collection to sidebar
		this.div.innerHTML = null;
		this.addToSidebar();
	},

	getActive: function() {
		return this.collection[this.activeToken];
	},

	addToCollection: function(i) {
		this.collection.push(this.tokens[i].color);
		console.log(this.collection);
		this.tokens.splice(i, 1);

		var node = this.div.childNodes[this.activeToken];
		node.classList.remove('selected');
		
		this.activeToken = this.collection.length - 1;
		this.addToSidebar();
	},

	addToSidebar: function() {
		var item = document.createElement('div');
		item.classList.add('color');
		item.classList.add('selected');
		item.style.backgroundColor = this.collection[this.activeToken];
		this.div.appendChild(item);
	}

};