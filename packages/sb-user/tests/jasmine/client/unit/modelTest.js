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

	it('UniqueAppAbbrevUpperCase.User.user works on client', function(done) {
		expect(UniqueAppAbbrevUpperCase.User.user()).toEqual(null);
		var user = UniqueAppAbbrevUpperCase.fixture.tester;
		Meteor.loginWithPassword(user.email, user.password, function(err) {
			expect(UniqueAppAbbrevUpperCase.User.user()).toBeDefined();
			expect(UniqueAppAbbrevUpperCase.User.ID()).toBeDefined();	
			done();
		});
	});

});

