UniqueAppAbbrevUpperCase.namespacer('UniqueAppAbbrevUpperCase.User', {user :
	function user(serverThis) {
	var user = Meteor.user()
	// console.log('UniqueAppAbbrevUpperCase.User.user()2', user);
	if (user) return new UniqueAppAbbrevUpperCase.User.model(user);
	else return null;
	}
});

UniqueAppAbbrevUpperCase.namespacer('UniqueAppAbbrevUpperCase.User', {ID :
	function ID() {
	return Meteor.userId();
	}
});

UniqueAppAbbrevUpperCase.namespacer('UniqueAppAbbrevUpperCase.User', {findOne :
	// expects array of selector statements, sort object
	function findOne(selector, sort) {
	var selectObj = {}; sortObj = {};
	if (selector !== undefined && Object.keys(selector).length)
	  selectObj = selector;
	if (sort !== undefined && Object.keys(sort).length)
	  sortObj = sort;

	return Meteor.users.findOne(selectObj,
	                            { sort: sortObj, 
	                              transform: function(doc) {
	                                return new UniqueAppAbbrevUpperCase.User.model(doc);
	                              }
	                            });
	}
});

UniqueAppAbbrevUpperCase.namespacer('UniqueAppAbbrevUpperCase.User', {find :
	function find(selector, sort) {
	var selectObj = {}; sortObj = {};
	if (selector !== undefined && Object.keys(selector).length)
	  selectObj = selector;
	if (sort !== undefined && Object.keys(sort).length)
	  sortObj = sort;

	return Meteor.users.find(selectObj,
	                          { sort: sortObj, 
	                            transform: function(doc) {
	                              return new UniqueAppAbbrevUpperCase.User.model(doc);
	                            }
	                          });
	}
});


UniqueAppAbbrevUpperCase.namespacer('UniqueAppAbbrevUpperCase.User', {model :
	function(doc) {
	_.extend(this, doc);
	}
});

// instance methods
_.extend(UniqueAppAbbrevUpperCase.User.model.prototype, {
	// TODO add programatically to all models
	update : function update(modifier) {
	Meteor.users.update({_id: this._id}, modifier, function(err, res) {
	  if (err) throw err;
	  else return res;
	});
	}
});

// static methods
_.extend(UniqueAppAbbrevUpperCase.User, {
	exists : function exists(email) {
	var ret
	Meteor.call('findUserByEmail', email, function(err, res) {
	  if (err) throw err;
	  console.log('findUserByEmail: ', err, res, (res != undefined));
	  ret = res != undefined;
	});
	return ret
	}
});




var userProfileSchema = new SimpleSchema({
	firstName: {
	  type: String,
	  optional: true
	},
	lastName: {
	  type: String,
	  optional: true
	},
	birthday: {
	  type: Date,
	  optional: true
	},
	gender: {
	  type: String,
	  allowedValues: ['Male', 'Female'],
	  optional: true
	},
	organization : {
	  type: String,
	  optional: true
	},
	website: {
	  type: String,
	  regEx: SimpleSchema.RegEx.Url,
	  optional: true
	},
	bio: {
	  type: String,
	  optional: true
	},
	online: { type: Boolean, optional: true, blackbox: true }
});


var userSchema = new SimpleSchema({
	username: {
	type: String,
	// For accounts-password, either emails or username is required, but not both. It is OK to make this
	// optional here because the accounts-password package does its own validation.
	// Third-party login packages may not require either. Adjust this schema as necessary for your usage.
	optional: true
	},
	emails: {
	type: Array,
	// For accounts-password, either emails or username is required, but not both. It is OK to make this
	// optional here because the accounts-password package does its own validation.
	// Third-party login packages may not require either. Adjust this schema as necessary for your usage.
	optional: true
	},
	"emails.$": {
	type: Object
	},
	"emails.$.address": {
	type: String,
	regEx: SimpleSchema.RegEx.Email
	},
	"emails.$.verified": {
	type: Boolean
	},
	createdAt: {
	type: Date
	},
	profile: {
	type: userProfileSchema,
	},
	// Make sure this services field is in your schema if you're using any of the accounts packages
	services: {
	type: Object,
	optional: true,
	blackbox: true
	},
	roles: {
	type: Object,
	optional: true,
	blackbox: true
	},
	// In order to avoid an 'Exception in setInterval callback' from Meteor
	heartbeat: {
	type: Date,
	optional: true
	},
	status: {
	type: Object,
	optional: true,
	blackbox: true
	}
});

Meteor.users.attachSchema(userSchema);


