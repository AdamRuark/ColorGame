module.exports = {
	sidebar: document.getElementById('sidebar'),
	tokens: [],
	collection: [],
	activeToken: null,
	init: function(tokens) {
		this.tokens = tokens;
		this.collection = ['white'];
		this.activeToken = 0;

		// TODO: Add collection to sidebar
	
	},

	getActive: function() {
		return this.collection[this.activeToken];
	},

	addToCollection: function(i) {
		this.collection.push(this.tokens[i]);
		this.tokens.splice(i, 1);
		this.activeToken = this.collection.length - 1;
	}

};