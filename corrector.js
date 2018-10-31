const fs = require('fs');
const delComments = require('./delComments.js');

function correctorFromTo(fielnameFrom, fielnameTo, cb) {
	fs.readFile(fielnameFrom, function(err, data) {  
		if (err) throw err;

		const contents = data.toString();
		let str = contents;
		let newStr = delComments.delComment(str);
		newStr = corrector(newStr);
		cb(newStr, fielnameTo);
	});
}

function write(str, fielnameTo) {
	fs.writeFile(fielnameTo, str, function(err) {
		if (err) throw err; 
	});
}

function corrector(str) {
	let newStr = '';
	let count = 0;
	let state = 'code';
	
	function tab(count) {
		let tab = '';
		for (let i = 0; i < count; i++) {
			tab += '\t';
		}
		return tab;				
	}

	for (let i = 0; i < str.length; i++) {
		switch(state) {
			case 'code':
				if (str[i] === ';') {
					newStr += str[i];					
					state = 'symbol';
				}else if (str[i] === '\n') {
					state = 'symbol';
				} else if (str[i] === '{') {
					newStr += str[i];
					state = 'symbol';
					count++;
				} else if (str[i] === '}') {
					count--;
					newStr += '\n' + tab(count) + str[i];
				} else if (str[i] === '"') {
					newStr += str[i];
					state = 'quotes';
				} else if (str[i] === "'") {
					newStr += str[i];
					state = 'quoteationMark';
				}  else {
					newStr += str[i];
				}
				break;
			case 'symbol':
				if (str[i] === '\r') {
					newStr += str[i];
					state = 'code';
				} else if (str[i] === ' ' || str[i] === '\t') {
					newStr += '';
				} else if (str[i] === '}') {
					count--;
					newStr += '\n' + tab(count) + str[i];
					state = 'code';
				} else {
					newStr += '\n' + tab(count) + str[i];
					state = 'code';
				}
				break;
			case 'quoteationMark':	
				if (str[i] === "'" || str[i] === '\n') {
					newStr += str[i];
					state = 'code';
				} else {
					newStr += str[i];
				}
				break;
			case 'quotes':
				if (str[i] === '"' || str[i] === '\n') {
					newStr += str[i];
					state = 'code';	
				} else {
					newStr += str[i];
				}
				break;
		}
	}
	return newStr;
}

correctorFromTo('from.js', 'to.js', write);