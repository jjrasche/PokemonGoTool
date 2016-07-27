PGT.namespacer('PGT', {debug : false});

PGT.namespacer('PGT', {handleServerError : 
	function handleServerError(err) {
		console.log('handleServerError : ', err);
		if (Meteor.isClient) alert(err);
	}
});

PGT.namespacer('PGT', {handleClientError : 
	function handleClientError(err) {
		console.log('handleClientError : ', err);
	}
});

/* 
	Error to throw in Meteor Methods that will not cause
	server error for client side exceptions.
*/
PGT.namespacer('PGT', {Error : 
	function(error, reason, details) {
		// console.log('PGT.Error : ', error, reason, details);
		var error = new Meteor.Error(error, reason, details);
		if (Meteor.isClient) {
			return error;
		} else if (Meteor.isServer) {
			throw error;
		}
	}
});