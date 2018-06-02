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
		this.tokens.splice(i, 1);

		var node = this.div.childNodes[this.activeToken];
		node.classList.remove('active');
		
		this.activeToken = this.collection.length - 1;
		this.addToSidebar();
	},

	addToSidebar: function() {
		var row = document.createElement('div');
		var token = document.createElement('div');
		row.classList.add('color');
		row.classList.add('active');
		// token.classList.add('color');
		row.style.backgroundColor = this.collection[this.activeToken];
		// row.appendChild(token);
		this.div.appendChild(row);
	},

	changeActive: function(dir) {

		var div = document.getElementsByClassName('color');
		div[this.activeToken].classList.remove('active');

		if(dir == 'w') {
			this.activeToken--;
			if(this.activeToken < 0) {
				this.activeToken = this.collection.length - 1;			
			}

		}
		else {
			this.activeToken++;
			if(this.activeToken >= this.collection.length) {
				this.activeToken = 0;			
			}
		}
		div[this.activeToken].classList.add('active');
	}

};