PortalController = PGT.Router.baseController.extend({
	before: [
		function() {
			// portal spefic subscriptions not setup at the template-level
		}
	]
});

Router.route('/', {
	name : 'pgtPortalMainPage',
	controller: PortalController
	// can wait for subscription in route or in oncreate method of template
	// waitOn : function() {
	// 	return Meteor.subscribe('pgtPortalPublications', PGT.User.ID());
	// },
});