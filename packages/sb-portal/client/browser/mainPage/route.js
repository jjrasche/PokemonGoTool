Router.route('/', {
	name : 'UniqueAppAbbrevLowerCasePortalMainPage',
	// can wait for subscription in route or in oncreate method of template
	// waitOn : function() {
	// 	return Meteor.subscribe('UniqueAppAbbrevLowerCasePortalPublications', UniqueAppAbbrevUpperCase.User.ID());
	// },
});

Router.onBeforeAction(UniqueAppAbbrevUpperCase.Router.requireLogin, {except : ['UniqueAppAbbrevLowerCasePortalMainPage']});
Router.onBeforeAction('dataNotFound', {except : ['UniqueAppAbbrevLowerCasePortalMainPage']});
