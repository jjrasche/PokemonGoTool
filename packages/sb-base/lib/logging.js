UniqueAppAbbrevUpperCase.namespacer('UniqueAppAbbrevUpperCase', {debug: false});

UniqueAppAbbrevUpperCase.namespacer('UniqueAppAbbrevUpperCase', {handleServerError : 
	function handleServerError(err) {
		console.log("handleServerError: ", err);
		if (Meteor.isClient) alert(err);
	}
});

UniqueAppAbbrevUpperCase.namespacer('UniqueAppAbbrevUpperCase', {handleClientError : 
	function handleClientError(err) {
		console.log("handleClientError: ", err);
	}
});

/* 
	Error to throw in Meteor Methods that will not cause
	server error for client side exceptions.
*/
UniqueAppAbbrevUpperCase.namespacer('UniqueAppAbbrevUpperCase', {Error : 
	function(error, reason, details) {
		// console.log('UniqueAppAbbrevUpperCase.Error: ', error, reason, details);
		var error = new Meteor.Error(error, reason, details);
		if (Meteor.isClient) {
			return error;
		} else if (Meteor.isServer) {
			throw error;
		}
	}
});