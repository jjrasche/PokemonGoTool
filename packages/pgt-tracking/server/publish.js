Meteor.publish('sighting', function() {
  return PGT.Sighting.find({});
});

Meteor.publish('searchRequest', function() {
  return PGT.SearchRequest.find({});
});