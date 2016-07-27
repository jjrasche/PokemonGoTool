PGT.namespacer('PGT', {Sighting: 
  new Mongo.Collection('sighting', {
	transform: function (doc) { 
	  return new PGT.Sighting.model(doc);
	}
  })
});

// any ORM happens here, e.g. normalizing data
PGT.namespacer('PGT.Sighting', {model :
	function(doc) {
		_.extend(this, doc);
	}
});

// instance methods
_.extend(PGT.Sighting.model.prototype, {
});

// static methods
_.extend(PGT.Sighting, {
});


PGT.namespacer('PGT.Sighting', {schema : 
	new SimpleSchema({
		loc : {
			type : PGT.Schema.latLong,
		},
		expirationTime : {
			type : Number
		},
		pokeNumber : {
			type : Number,
			allowedValues: PGT.Pokemon.getNumbers()
		}
	})
});

PGT.Sighting.attachSchema(PGT.Sighting.schema);





