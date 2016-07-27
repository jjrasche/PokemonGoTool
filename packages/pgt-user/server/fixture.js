PGT.namespacer('PGT.User.fixture', {formObject : 
	function formObject(args) {
		return {
			email : args.email, 
			username : args.username,
			profile : {},
			password : args.password
		}
	}
});


if (!PGT.User.find().count()) {
	console.log('No Users in DB. Started to create ' + PGT.Util.getFormattedTime());


	var firstUser = PGT.User.fixture.formObject({
		email:'j@j.com'
		,username:'jjj'
		,password:'jjjjjj'
	});
	Accounts.createUser(firstUser);

	console.log('Finished User creation ' + PGT.Util.getFormattedTime());
}