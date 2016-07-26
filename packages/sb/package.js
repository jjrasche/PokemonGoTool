var client = ['client'];
var server = ['server'];
var both = client.concat(server);

Package.describe({
	summary : 'Package organizing dependencies for Sport Betting App.',
	version : '0.0.1',
	name : 'meteorUsername:UniqueAppAbbrevLowerCase',
});


Package.onUse(function(api) {
	api.imply([
		'meteorUsername:UniqueAppAbbrevLowerCase-base'
		,'meteorUsername:UniqueAppAbbrevLowerCase-user'
		,'meteorUsername:UniqueAppAbbrevLowerCase-portal'
	], both);


	api.export('UniqueAppAbbrevUpperCase');
});

Package.onTest(function(api) {
});

Npm.depends({
});


/*
	mongorestore -h 127.0.0.1 --port 3001 -d meteor dump/meteor
	velocity test-packages meteorUsername:UniqueAppAbbrevLowerCase-base --port 3002

	Model layout
	<AppName>.<Object>.model					UniqueAppAbbrevUpperCase.Board.model.findOne(...)
	<AppName>.<Object>.<action>				UniqueAppAbbrevUpperCase.Board.modify
	<AppName>.<Object>.validate.<action>		UniqueAppAbbrevUpperCase.Board.validate.modify


	<collection>.find(selector, [options]) for transform to be used the order of 
	options must be transform --> sort. And not the other way around.	
	

	pub/sub model
	- templates are responsible for subscribing to needed data
	- attempt : make page level subscriptions in layout templates
	- use publish-composite to group all information needed by a single page

	queries 
	- UniqueAppAbbrevUpperCase.User.find({}, {sort : {['status.online' : -1,username : -1]}}).fetch().map(function(u) { return u.username })
	- UniqueAppAbbrevUpperCase.User.find({'status.lastLogin' : {$exists : true}}, {sort : {'status.lastLogin.date' : -1}}).map(function(u) { console.log(u.username + '	' + u.status.lastLogin.date) })
*/