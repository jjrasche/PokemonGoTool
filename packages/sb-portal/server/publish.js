Meteor.publishComposite('UniqueAppAbbrevLowerCasePortalPublication', function(userID) {
	return {
		find : function() {
			return UniqueAppAbbrevUpperCase.User.find({_id : userID});
		}
	}
});