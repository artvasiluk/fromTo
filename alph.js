function fearNotLetter(str) {
  let alph = "abcdefghijklmnopqrstuvwxyz";
  let test = alph.substring(alph.indexOf(str[0]));
  
  for (let i = 0; i < test.length; i++) {
    if (test[i] !== str[i]) {
      
	  return test[i];
    }
  } 
  
}

console.log(fearNotLetter("abce"));