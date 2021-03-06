var client = ['client'];
var server = ['server'];
var both = client.concat(server);

Package.describe({
	summary : '.',
	version : '0.0.1',
	name : 'jjrasche:pgt-user',
});

Package.onUse(function(api) {
	// server and client dependencies
	var packages = [
		'jjrasche:pgt-base'
		,'mizzao:user-status'
		,'accounts-base'
		,'accounts-password'
	]
	api.use(packages, both);
	api.imply(packages, both);

	// client only files
	api.addFiles([
		'lib/user/user.js'
		,'lib/user/meteorMethods.js'
	], both);


	// server only dependencies
	api.use([
	], server);

	// server only files
	api.addFiles([
		'server/fixture.js'
		,'server/onCreateUser.js'
	], server);


	// client only dependencies
	api.use([
		'ian:accounts-ui-bootstrap-3'
	], client);

	// client only files
	api.addFiles([
		'client/config.accounts.js'
	], client);

	api.export(['Accounts']);
});

Package.onTest(function(api) {
	api.use([
		'jjrasche:pgt-user'
		,'sanjo:jasmine@0.21.0'
		,'jjrasche:pgt-testing@0.0.1'	// debug only so only compiled when Testing
	]);

	// api.addFiles('tests/jasmine/client/integration/wait_for_router_helper.js', client);
	// api.addFiles('tests/jasmine/client/unit/fixtureTest.js', client);
	api.addFiles('tests/jasmine/client/unit/modelTest.js', client);
	api.addFiles('tests/jasmine/server/unit/modelTest.js', server);
	api.export(['PGT', 'Meteor', 'Accounts']);
});



Npm.depends({
});