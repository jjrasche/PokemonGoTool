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