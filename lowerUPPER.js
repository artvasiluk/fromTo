const fs = require('fs');



function read(fielnameFrom, fielnameTo, cb) {
	fs.readFile(fielnameFrom, function(err, data) {  
		if (err) throw err;  
		
		const contents = data.toString();
		let str = contents;
		console.log(str);
		let newStr = '';
		let switcher = 0;
		
		for (let i = 0; i < str.length; i++) {
			console.log(i, switcher);
						
			if (str[i] === ';' && switcher === 0) {
				switcher = 1;
			} else if (str[i] === ';' && switcher === 1) {
				switcher = 0;
			}
			
			switch(switcher) {
				case 0:
					newStr += str[i];
					break;
				
				case 1:
					newStr += str[i].toUpperCase();
					break;
			}
		}
		cb(newStr, fielnameTo);
		console.log(newStr);
	});
}

read('fromLowerUperr.js', 'toLowerUpper.js', write);

function write(str, fielnameTo) {
	fs.writeFile(fielnameTo, str, function(err) {
		if (err) throw err; 
	});
}