Meteor.publishComposite('pgtPortalPublication', function(userID) {
	return {
		find : function() {
			return PGT.User.find({_id : userID});
		}
	}
});