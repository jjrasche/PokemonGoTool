var RaisingPageController = PGT.Router.baseController.extend({
	before : [
		function() {
			// portal spefic subscriptions not setup at the template-level
			this.next();
		}
	]
});

Router.route('/raise', {
	name : 'pgt.raising.page',
	controller : RaisingPageController,
	// can wait for subscription in route or in oncreate method of template
	// waitOn : function() {
	// 	console.log('wiat on')
	// 	//return Meteor.subscribe('pgtPortalPublications', PGT.User.ID());
	// },
});