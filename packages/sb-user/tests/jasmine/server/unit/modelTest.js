describe('User model functionality Server', function() {
	beforeAll(function(done) {
		Meteor.call('resetTestingEnvironment', 'userClientModelTests.js', function(err, res) {
			console.log('resetTestingEnvironment : ', err, res);
			done();
		});
	});
	beforeAll(function(done) {
		Meteor.call('initializeFixutres', function(err, res) {
			console.log('initializeFixutres : ', err, res);
			done();
		});
	});

	it('getUser baisc query selector works', function(done) {
		var baseUser = Meteor.users.findOne()
		var UniqueAppAbbrevLowerCaseUser = UniqueAppAbbrevUpperCase.User.findOne({username : baseUser.username});
		expect(baseUser._id).toEqual(UniqueAppAbbrevLowerCaseUser._id);
		done();
	});

	it('invalid data returns nothing', function(done) {
		var UniqueAppAbbrevLowerCaseUser = UniqueAppAbbrevUpperCase.User.findOne({username : 'notAValidName'});
		expect(UniqueAppAbbrevLowerCaseUser).toBeUndefined();
		done();
	});

	it('empty query returns something', function(done) {
		var UniqueAppAbbrevLowerCaseUser = UniqueAppAbbrevUpperCase.User.findOne();
		if (Meteor.users.find().count()) expect(UniqueAppAbbrevLowerCaseUser).toBeDefined();
		else expect(UniqueAppAbbrevLowerCaseUser).toBeUndefined();
		done();
	}); 



	it('getUsers baisc query selector works', function(done) {
		var baseUser = Meteor.users.findOne()
		// if (!baseUser) throw Meteor.Error('no users');	// not apart of test
		var UniqueAppAbbrevLowerCaseUser = UniqueAppAbbrevUpperCase.User.find({username : baseUser.username}).fetch()[0];
		expect(baseUser._id).toEqual(UniqueAppAbbrevLowerCaseUser._id);
		done();
	});

	it('getUsers sort argument works', function(done) {
		var UniqueAppAbbrevLowerCaseUsers = UniqueAppAbbrevUpperCase.User.find({}, {username : -1}).fetch();
		expect(UniqueAppAbbrevLowerCaseUsers[0].username).toBeGreaterThan(UniqueAppAbbrevLowerCaseUsers[1].username);

		UniqueAppAbbrevLowerCaseUsers = UniqueAppAbbrevUpperCase.User.find({}, {username : 1}).fetch();
		expect(UniqueAppAbbrevLowerCaseUsers[1].username).toBeGreaterThan(UniqueAppAbbrevLowerCaseUsers[0].username);

		done();
	});	

	it('getUser transform works', function(done) {
		var UniqueAppAbbrevLowerCaseUser = UniqueAppAbbrevUpperCase.User.find({}, {limit : 1}).fetch()[0];
		expect(UniqueAppAbbrevLowerCaseUser.update).toBeDefined();
		done();
	});

	// can't call Meteor.user outside Meteor.method or publish call	
	// may need to find another way to handle this	
	// war4
	// it('UniqueAppAbbrevUpperCase.User.user works on server', function(done) {
	// 	expect(UniqueAppAbbrevUpperCase.User.user()).toBeUndefined();
	// });

	// it('UniqueAppAbbrevUpperCase.User.ID works on server', function(done) {
	// 	expect(UniqueAppAbbrevUpperCase.User.ID()).toBeUndefined();
	// });
});







