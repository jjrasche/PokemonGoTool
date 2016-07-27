var client = ['client'];
var server = ['server'];
var both = client.concat(server);

Package.describe({
	summary : 'Base app for colleections and project wide dependencies.',
	version : '0.0.1',
	name : 'jjrasche:pgt-base',
});


Package.onUse(function(api) {
	// server and client dependencies
	var packages = [
		'meteor-base'
		,'jquery'
		,'templating'
		,'iron:router@1.0.12'
		,'mobile-experience'
		,'mongo'
		,'email'
		,'random'
		,'aldeed:collection2'
		,'aldeed:autoform'
		// ,'autopublish'
		,'check'
		,'blaze-html-templates'
	];
	api.use(packages, both);
	api.imply(packages, both);
	// server and client files
	api.addFiles([
		'lib/namespace.js'
		,'lib/util.js'
		,'lib/sharedSchemas.js'
		,'lib/baseNamespace.js'
		,'lib/enhancement/dateEnhancements.js'
		,'lib/enhancement/arrayEnhancements.js'
		,'lib/enhancement/numberEnhancements.js'
		,'lib/logging.js'
		,'lib/meteorMethods.js'
		,'lib/move/move.js'
		,'lib/pokemon/pokemon.js'
	], both);


	packages = ['reywood:publish-composite'];
	api.use(packages, server);
	api.imply(packages, server);

	// server only files
	api.addFiles([
		'server/fixture/moveFixture.js'
		,'server/fixture/pokemonFixture.js'
		,'server/publish.js'
	], server);


	// client only dependencies
	packages = [
		'tracker'
		// ,'blaze-html-templates'
		,'session'
		,'standard-minifiers'
		,'es5-shim'
		,'ecmascript'
		,'twbs:bootstrap'
		,'peppelg:bootstrap-3-modal'
		,'yogiben:autoform-modals'
		,'sacha:spin'
	]
	api.use(packages, client);
	api.imply(packages, client);

	// client only files
	api.addFiles([
		'client/browser/commonFunctions.js'
		,'client/browser/appLayout.html'
		,'client/browser/notFound.html'
		,'client/browser/routeConfig.js'
	], client);


	api.export(['PGT', 'Meteor']);
});

Package.onTest(function(api) {	
	api.use([
		'jjrasche:pgt-base'
		, 'sanjo:jasmine@0.21.0'
	// ,'jjrasche:pgt-testing@0.0.1'
	]);

	api.addFiles('tests/jasmine/server/unit/namespacerTests.js', server);

	api.export(['PGT', 'Meteor']);
});

Npm.depends({
});