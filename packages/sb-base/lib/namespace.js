UniqueAppAbbrevUpperCase = {};

UniqueAppAbbrevUpperCase.namespacer = function namespacer(namespace, members) {
	var names = namespace.split('.');
	var currentContext = UniqueAppAbbrevUpperCase;

	// validate input
	if (names.length == 0) throw new Meteor.Error('invalid namespace : '' + namespace + '\'');
	if (names[0] != 'UniqueAppAbbrevUpperCase') throw new Meteor.Error('root of namespace must be UniqueAppAbbrevUpperCase : \'' + namespace + '\'');
	else names = names.slice(1);	// remove root element

	// Add namespaces if they don’t already exist
	_.each(names, function(name) {
		if (name.length === 0)
			throw new Meteor.Error('cannot have empty namespace values \'' + namespace + '\'');
		if (!currentContext[name])
			currentContext[name] = {};
		currentContext = currentContext[name];
	});

	// Add members to namespace
	 _.each(members, function(value, key) {
	 	// prevent namespace overrides
	 	if (currentContext[key]) 
	 		throw new Meteor.Error('attempting to override namespace \'' + key + '\' on ' + JSON.stringify(currentContext) + '	with ' + value);
	 	// prevent member overrides
	 	if (typeof(currentContext) !== 'object') 
	 		throw new Meteor.Error('attempting to override member\'' + key + '\' on ' + JSON.stringify(currentContext) + '	with ' + value);

		currentContext[key] = value;
	});
};