PGT.namespacer('PGT.Router', {baseController : 
	RouteController.extend({
		before: [
			function() {
				this.subscribe('pokemon').wait();
				this.subscribe('moves').wait();

				// check for login
				if (!PGT.User.user()) this.render('accessDenied');
				else this.next();
			}
		]
	})
});

Router.configure({
	layoutTemplate: 'ApplicationLayout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound'
});


// can only have one onBeforeAction until bug fixed https://github.com/iron-meteor/iron-router/issues/1270
// Router.onBeforeAction('dataNotFound', {except: ['pgtPortalMainPage']});
