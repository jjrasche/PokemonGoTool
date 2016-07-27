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
		var pgtUser = PGT.User.findOne({username : baseUser.username});
		expect(baseUser._id).toEqual(pgtUser._id);
		done();
	});

	it('invalid data returns nothing', function(done) {
		var pgtUser = PGT.User.findOne({username : 'notAValidName'});
		expect(pgtUser).toBeUndefined();
		done();
	});

	it('empty query returns something', function(done) {
		var pgtUser = PGT.User.findOne();
		if (Meteor.users.find().count()) expect(pgtUser).toBeDefined();
		else expect(pgtUser).toBeUndefined();
		done();
	}); 



	it('getUsers baisc query selector works', function(done) {
		var baseUser = Meteor.users.findOne()
		// if (!baseUser) throw Meteor.Error('no users');	// not apart of test
		var pgtUser = PGT.User.find({username : baseUser.username}).fetch()[0];
		expect(baseUser._id).toEqual(pgtUser._id);
		done();
	});

	it('getUsers sort argument works', function(done) {
		var pgtUsers = PGT.User.find({}, {username : -1}).fetch();
		expect(pgtUsers[0].username).toBeGreaterThan(pgtUsers[1].username);

		pgtUsers = PGT.User.find({}, {username : 1}).fetch();
		expect(pgtUsers[1].username).toBeGreaterThan(pgtUsers[0].username);

		done();
	});	

	it('getUser transform works', function(done) {
		var pgtUser = PGT.User.find({}, {limit : 1}).fetch()[0];
		expect(pgtUser.update).toBeDefined();
		done();
	});

	// can't call Meteor.user outside Meteor.method or publish call	
	// may need to find another way to handle this	
	// war4
	// it('PGT.User.user works on server', function(done) {
	// 	expect(PGT.User.user()).toBeUndefined();
	// });

	// it('PGT.User.ID works on server', function(done) {
	// 	expect(PGT.User.ID()).toBeUndefined();
	// });
});







