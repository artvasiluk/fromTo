const fs = require('fs');

function delComment(fielnameFrom, fielnameTo, cb) {
	fs.readFile(fielnameFrom, function(err, data) {  
		if (err) throw err;  
		
		const contents = data.toString();
		let str = contents;
		console.log(str + '\n_______________________________');
		let newStr = '';
		let state = 'code';
		
		for (let i = 0; i < str.length; i++) {

			switch(state) {
				case 'code':
					if (str[i] === '/') {
						state = 'slash';
					} else if (str[i] === '"') {
						newStr += str[i];
						state = 'quotes';
					}else if (str[i] === "'") {
						newStr += str[i];
						state = 'quoteationMark';
					} else {
						newStr += str[i];
					}
					break;
				case 'slash':
					if (str[i] === '/') {
						state = 'oneLineComment';
					} else if (str[i] === '*') {
						state = 'multiLineComment';
					} else if (str[i] === "'") {
						newStr += '/' + str[i];
						state = 'quoteationMark';
					} else if (str[i] === '"') {
						newStr += '/' + str[i];
						state = 'quotes';
					}else {
						newStr += '/' + str[i];
						state = 'code';
					}
					break;
				case 'oneLineComment':
					if (str[i] === '\n') {
						newStr += str[i];
						state = 'code';
					}
					break;
				case 'multiLineComment':
					if (str[i] === '*') {
						state = 'star'
					}
					break;
				case 'star':
					if (str[i] === '/') {
						state = 'code';
					} else {
						state = 'multiLineComment';
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
		cb(newStr, fielnameTo);
		console.log(newStr);
	});
}

delComment('fromDelComments.js', 'toDelComments.js', write);

function write(str, fielnameTo) {
	fs.writeFile(fielnameTo, str, function(err) {
		if (err) throw err; 
	});
}