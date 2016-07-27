describe('User model functionality Client', function() {
	beforeAll(function(done) {
		Meteor.call('resetTestingEnvironment', 'userServerModelTests.js', function(err, res) {
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

	it('PGT.User.user works on client', function(done) {
		expect(PGT.User.user()).toEqual(null);
		var user = PGT.fixture.tester;
		Meteor.loginWithPassword(user.email, user.password, function(err) {
			expect(PGT.User.user()).toBeDefined();
			expect(PGT.User.ID()).toBeDefined();	
			done();
		});
	});

});

