PGT.namespacer('PGT', {SearchRequest: 
  new Mongo.Collection('searchRequest', {
	transform: function (doc) { 
	  return new PGT.SearchRequest.model(doc);
	}
  })
});

// any ORM happens here, e.g. normalizing data
PGT.namespacer('PGT.SearchRequest', {model :
	function(doc) {
		_.extend(this, doc);
	}
});

/*

*/


// instance methods
_.extend(PGT.SearchRequest.model.prototype, {
});


// static methods
_.extend(PGT.SearchRequest, {
	executeServerRequest : function executeServerRequest(reqID) {
		Meteor.call('run', reqID, function(err, res) {
			if (err) console.log(err);
			console.log('ran: ', res);
		})
	}
});


var searchRequestSchema = new SimpleSchema({
	loc : {
		type : PGT.Schema.latLong,
	},
	sightingIDs : {
		type : [String]
	},
	enabled : {
		type : Boolean
	}
});

PGT.SearchRequest.attachSchema(searchRequestSchema);





