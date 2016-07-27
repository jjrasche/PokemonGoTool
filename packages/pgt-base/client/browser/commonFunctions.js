Template.registerHelper('loggedIn', function() {
	return PGT.User.ID();
});
Template.registerHelper('notLoggedIn', function() {
	return !PGT.User.ID();
});