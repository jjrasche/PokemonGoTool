Meteor.methods({
	initializeFixutres : function initializeFixutres() {
		var tester; tester2;
		// create users
		if (!UniqueAppAbbrevUpperCase.User.find().count()) {	
			tester = UniqueAppAbbrevUpperCase.User.fixture.formObject(UniqueAppAbbrevUpperCase.fixture.tester);
			Accounts.createUser(tester);
			tester = UniqueAppAbbrevUpperCase.User.findOne();
			if (UniqueAppAbbrevUpperCase.debug) console.log(tester);

			tester2 = UniqueAppAbbrevUpperCase.User.fixture.formObject(UniqueAppAbbrevUpperCase.fixture.tester2);
			Accounts.createUser(tester2);
			if (UniqueAppAbbrevUpperCase.debug) console.log(tester2);
		}
	}
});