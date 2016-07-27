PGT.namespacer('PGT', {Move: 
  new Mongo.Collection('move', {
	transform: function (doc) { 
	  return new PGT.Move.model(doc);
	}
  })
});

PGT.namespacer('PGT.Move', {model :
	function(doc) {
		_.extend(this, doc);
	}
});

// compare methods
highestDPSMoves = function highestDPSMoves(m1, m2) {return m2.dps - m1.dps;}

// instance methods
_.extend(PGT.Move.model.prototype, {
	// TODO add programatically to all models
	update : function update(modifier) {
		Meteor.users.update({_id : this._id}, modifier, function(err, res) {
			if (err) throw err;
			else return res;
		});
	},
	isSTABMove : function isSTABMove(pokemon) {
		return pokemon.isType(this.type);
	},
	getRating : function getRating(pokemon) {
		return (pokemon.baseAttack * this.dps * 
				(this.isSTABMove(pokemon) ? 1.25 : 1))
				.toFixed(2);
	},
	isQuickMove : function isQuickMove() {
		return this.energy === undefined;
	},
	isChargeMove : function isChargeMove() {
		return this.energy !== undefined;
	}
});

// static methods
_.extend(PGT.Move, {
	moveByDPS : function moveByDPS() {
		return PGT.Util.mapToOrderedList(moveList, highestDPSMoves)
	}
});



var moveSchema = new SimpleSchema({
	name : {
		type : String,
	},
	type : {
		type : String,
		allowedValues : PGT.Base.types,
	},
	damage : {
		type : Number,
		min : 0
	},
	duration : {
		type : Number,
		min : 0,
		decimal : true
	},
	dps : {
		type : Number,
		min : 0,
		decimal : true
	},
	energy :  {
		type : Number,
		min : 0,
		max : 5,
		optional: true
	}
});

PGT.Move.attachSchema(moveSchema);

