var client = ['client'];
var server = ['server'];
var both = client.concat(server);

Package.describe({
	summary : 'Package holding functionality and UI for tracking Pokemon\
				Integrates with PokeVision API to get pokemon in a given area.',
	version : '0.0.1',
	name : 'jjrasche:pgt-tracking',
});


Package.onUse(function(api) {
	// server and client dependencies
	var packages = [
		'jjrasche:pgt-base@0.0.1'
		// ,'jjrasche:pgt-user@0.0.1'
	]
	api.use(packages);
	api.imply(packages);	// testing package, at least, will use depenedent packages

	api.addFiles([
		'lib/searchRequest/searchRequest.js'
		,'lib/sighting/sighting.js'
	], both);


	api.addFiles([
		'server/publish.js'
		,'server/fixture/searchRequestFixture.js'
		,'lib/searchRequest/meteorMethods.js'
		,'lib/sighting/meteorMethods.js'
	], server);

	// client only files
	api.addFiles([
		// 'client/browser/raisingPage/route.js'
		// ,'client/browser/raisingPage/style.css'
		// ,'client/browser/raisingPage/helper.html'
		// ,'client/browser/raisingPage/layout.html'
		// ,'client/browser/raisingPage/helper.js'
	], client);
});

Package.onTest(function(api) {	
	api.use([
		'jjrasche:pgt-portal'
		,'sanjo:jasmine@0.21.0'
		,'jjrasche:pgt-testing'	// debug only so only compiled when Testing
	], both);

	api.addFiles('tests/jasmine/client/integration/wait_for_router_helper.js', client);
	api.addFiles('tests/jasmine/client/integration/portalPageTest.js', client);
	api.export(['PGT', 'Meteor']);
});

Npm.depends({
	fibers : '1.0.10'
	,request : '2.72.0'
});