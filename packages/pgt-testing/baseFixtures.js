Meteor.methods({
	initializeFixutres : function initializeFixutres() {
		var tester; tester2;
		// create users
		if (!PGT.User.find().count()) {	
			tester = PGT.User.fixture.formObject(PGT.fixture.tester);
			Accounts.createUser(tester);
			tester = PGT.User.findOne();
			if (PGT.debug) console.log(tester);

			tester2 = PGT.User.fixture.formObject(PGT.fixture.tester2);
			Accounts.createUser(tester2);
			if (PGT.debug) console.log(tester2);
		}
	}
});