UniqueAppAbbrevUpperCase.namespacer('UniqueAppAbbrevUpperCase.fixture', {randomNumber : 
	function randomNumber(min, max) {
		return Math.floor(Math.random() * (max-min)) + min;
	}
});

UniqueAppAbbrevUpperCase.namespacer('UniqueAppAbbrevUpperCase.fixture', {randomBool : 
	function randomBool() {
		return Math.floor(Math.random()*2) ? true : false;
	}
});