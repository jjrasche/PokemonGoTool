var client = ['client'];
var server = ['server'];
var both = client.concat(server);

Package.describe({
	summary : 'Package organizing dependencies for Sport Betting App.',
	version : '0.0.1',
	name : 'jjrasche:pgt',
});


Package.onUse(function(api) {
	api.imply([
		'jjrasche:pgt-base'
		,'jjrasche:pgt-user'
		,'jjrasche:pgt-portal'
		,'jjrasche:pgt-raising'
	], both);


	api.export('PGT');
});

Package.onTest(function(api) {
});

Npm.depends({
});


/*
	mongorestore -h 127.0.0.1 --port 3001 -d meteor dump/meteor
	velocity test-packages jjrasche:pgt-base --port 3002

	Model layout
	<AppName>.<Object>.model					PGT.Board.model.findOne(...)
	<AppName>.<Object>.<action>				PGT.Board.modify
	<AppName>.<Object>.validate.<action>		PGT.Board.validate.modify


	<collection>.find(selector, [options]) for transform to be used the order of 
	options must be transform --> sort. And not the other way around.	
	

	pub/sub model
	- templates are responsible for subscribing to needed data
	- attempt : make page level subscriptions in layout templates
	- use publish-composite to group all information needed by a single page

	queries 
	- PGT.User.find({}, {sort : {['status.online' : -1,username : -1]}}).fetch().map(function(u) { return u.username })
	- PGT.User.find({'status.lastLogin' : {$exists : true}}, {sort : {'status.lastLogin.date' : -1}}).map(function(u) { console.log(u.username + '	' + u.status.lastLogin.date) })
*/