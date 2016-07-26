var client = ['client'];
var server = ['server'];
var both = client.concat(server);

Package.describe({
	summary: "Base app for colleections and project wide dependencies.",
	version: "0.0.1",
	name: "meteorUsername:UniqueAppAbbrevLowerCase-portal",
});


Package.onUse(function(api) {
	// server and client dependencies
	var packages = [
		'meteorUsername:UniqueAppAbbrevLowerCase-base@0.0.1'
		,'meteorUsername:UniqueAppAbbrevLowerCase-user@0.0.1'
	]
	api.use(packages);
	api.imply(packages);	// testing package, at least, will use depenedent packages

	api.addFiles([
		'lib/namespace.js'
		,'lib/meteorMethods.js'
	], both);


	api.addFiles([
		'server/publish.js'
	], server);

	// client only files
	api.addFiles([
		'client/browser/mainPage/route.js'
		,'client/browser/mainPage/helper.html'
		,'client/browser/mainPage/layout.html'
		,'client/browser/mainPage/helper.js'
	], client);
});

Package.onTest(function(api) {	
	api.use([
		'meteorUsername:UniqueAppAbbrevLowerCase-portal'
		,'sanjo:jasmine@0.21.0'
		,'meteorUsername:UniqueAppAbbrevLowerCase-testing'	// debug only so only compiled when Testing
	], both);

	api.addFiles('tests/jasmine/client/integration/wait_for_router_helper.js', client);
	api.addFiles('tests/jasmine/client/integration/portalPageTest.js', client);
	api.export(['UniqueAppAbbrevUpperCase', 'Meteor']);
});

Npm.depends({
});