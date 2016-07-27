PGT.namespacer('PGT', {Pokemon: 
  new Mongo.Collection('pokemon', {
	transform: function (doc) { 
	  return new PGT.Pokemon.model(doc);
	}
  })
});

PGT.namespacer('PGT.Pokemon', {model :
	function(doc) {
		// if returning necessary movesID field
		if (doc.moveIDs !== undefined) {
			this.moves = PGT.Move.getMovesByID(doc.moveIDs);
		}
		_.extend(this, doc);
	}
});

// instance methods
_.extend(PGT.Pokemon.model.prototype, {
	// TODO add programatically to all models
	update : function update(modifier) {
		Meteor.users.update({_id : this._id}, modifier, function(err, res) {
			if (err) throw err;
			else return res;
		});
	},
	_moves : function _moves() {
		return this.moves;//PGT.Move.find({name : {$in : this.moves}}).fetch();
	},
	isType : function isType(type) {
		return this.type.filter(function(t) { t.match(new RegExp(type, 'i'))}).length != 0
	} 

});

// static methods
_.extend(PGT.Pokemon, {
	getNames : function getNames() {
		return PGT.Pokemon.find({}, {fields: {name: 1}})
	},
	getPokemonByName : function getPokemonByName(pokemonName) {
		return PGT.Pokemon.findOne({name : pokemonName});
	},
});


var cpData = new SimpleSchema({
	stardust : {
		type : Number,
		allowedValues : PGT.Base.stardustIncrements
	},
	level : {
		type : Number,
		decimal : true,
		allowedValues : PGT.Base.levelIncrements
	},
	minCP : {
		type : Number,
		min : PGT.Base.cpLowerLimit,
		max : PGT.Base.cpUpperLimit,		
		decimal : true
	},
	maxCP : {
		type : Number,
		min : PGT.Base.cpLowerLimit,
		max : PGT.Base.cpUpperLimit,		
		decimal : true
	}
}); 


var pokemonSchema = new SimpleSchema({
	name : {
		type : String,
	},
	number : {
		type : Number,
		optional : true		// TODO programatically enter pokemon number later e.g. bulbasaur = 1 etc
	},
	type : {
		type : [String],
		allowedValues : PGT.Base.types,
		minCount : 1,
		maxCount : 2
	},
	baseAttack : {
		type : Number,
		min : 0,
	},
	baseDefense : {
		type : Number,
		min : 0,
	},
	baseStamina : {
		type : Number,
		min : 0,
	},
	// TODO see if you can use moves collection to specify allowed values ... maybe in a custom field
	moveIDs : {
		type : [String],
		minCount : 2,
	},
	cpData : {
		type : [cpData]
	}
});

PGT.Pokemon.attachSchema(pokemonSchema);





