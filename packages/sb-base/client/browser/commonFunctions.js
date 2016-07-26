Template.registerHelper('loggedIn', function() {
	return UniqueAppAbbrevUpperCase.User.ID();
});
Template.registerHelper('notLoggedIn', function() {
	return !UniqueAppAbbrevUpperCase.User.ID();
});