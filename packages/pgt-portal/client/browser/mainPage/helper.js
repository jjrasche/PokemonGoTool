// subscription by widget in main layout
Template.pgtPortalMainPage.onCreated(function() {
	var instance = this;

	instance.autorun(function() {
		var userID = PGT.User.ID()
		var ret = instance.subscribe('pgtPortalPublication', userID);
	});
});
