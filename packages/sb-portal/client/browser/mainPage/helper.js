// subscription by widget in main layout
Template.UniqueAppAbbrevLowerCasePortalMainPage.onCreated(function () {
	var instance = this;

	instance.autorun(function () {
	var userID = UniqueAppAbbrevUpperCase.User.ID()
		var ret = instance.subscribe('UniqueAppAbbrevLowerCasePortalPublication', userID);
	});
});
