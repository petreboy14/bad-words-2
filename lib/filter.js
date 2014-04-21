var list = require('./lang.json').words;

var Filter = function (options) {
	options = options || {};
	this.list = options.list || list;
	this.strict = options.hasOwnProperty('strict') ? options.strict : false;
};

Filter.prototype.isProfane = function (string) {
	var foundProfane = false;
	for (var i = 0; i < this.list.length; i++) {
		var words = string.split(" ");
		for (var j = 0; j < words.length; j++) {
			if (words[j].toLowerCase().replace(/\*|\+|\-|\./g, '') === this.list[i].toLowerCase()) {
				return true;
			}
		}
	}
	return false;
};

Filter.prototype.replaceWord = function (string) {
	var self = this;
	return string.replace(/\*|\+|\-|\./g, '').split("").map(function (c, i) {
		if ((self.strict && i === 0) || (i > 0)) {
			return '*';
		} else {
			return c;
		}
	}).join("");
};

Filter.prototype.clean = function (string) {
	return string.split(" ").map(function (word) {
		return this.isProfane(word) ? this.replaceWord(word) : word;
	}.bind(this)).join(" ");
};

Filter.prototype.addWords = function (words) {
	words = (words instanceof Array) ? words : [words];
	this.list = this.list.concat(words);
};

module.exports = Filter;
