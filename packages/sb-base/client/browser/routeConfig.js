Router.configure({
  layoutTemplate: 'ApplicationLayout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
});

UniqueAppAbbrevUpperCase.namespacer('UniqueAppAbbrevUpperCase.Router', {requireLogin : 
	function() {
	  if (! UniqueAppAbbrevUpperCase.User.user())
	    this.render('accessDenied');
	  else 
	    this.next();
	}
});