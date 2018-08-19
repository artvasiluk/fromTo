const fs = require('fs');



function read(fielnameFrom, fielnameTo, cb) {
	fs.readFile(fielnameFrom, function(err, data) {  
		if (err) throw err;  
		
		const contents = data.toString();
		let str = contents;
		console.log(str);
		let newStr = '';
		let count = 0;
		
		function tab(count) {
			let tab = '';
			for (let i = 0; i < count; i++) {
				tab += '\t';
			}
			return tab;				
		}
		
		function whiteSpace(symb) {
			if (symb === ' ' || symb === '\t') {
				return '';
			}
		}
		
		for (let i = 0; i < str.length; i++) {
			newStr += str[i];

			
			if (str[i] === '{'&& str[i+1] !== '\r') {
				newStr += '\r' + '\n' + tab(count + 1);
				count++;
				//console.log('Inc', i, count);
			} else if (str[i] === ';' && str[i+1] !== '\r') {
				if (str[i+1] === ' ' || str[i+1] === '\t') {
					newStr += '';
				} else if (str[i+1] !== '}') {
					newStr += '\r' + '\n' + tab(count);
				} else {
					newStr += '\r' + '\n' + tab(count - 1);
				}
			} else if (str[i] === '}'&& str[i+1] !== '\r') {
				if (str[i+1] !== '}') {
					count--;
					newStr += '\r' + '\n' + tab(count);
					//console.log('Dec', i, count);
				} else {
					count--;
					newStr += '\r' + '\n' + tab(count - 1);
				}
			}
		}
		console.log(newStr);
	});
}

read('1.js', 'to.js', write);

function write(str, fielnameTo) {
	fs.writeFile(str, fielnameTo, function(err) {
		if (err) throw err; 
	});
}