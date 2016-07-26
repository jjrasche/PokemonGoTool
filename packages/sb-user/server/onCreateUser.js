if (Meteor.isServer) {
	Meteor.startup(function () {  
	Accounts.onCreateUser(function(options, user) {
	    user.profile = options.profile || {};

	    // handle any necessary actions prior to commiting user for the first time

	    return user
	})
	});
}

