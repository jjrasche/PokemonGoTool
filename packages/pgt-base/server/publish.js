Meteor.publish('pokemon', function() {
  return PGT.Pokemon.find({});
});

Meteor.publish('moves', function() {
  return PGT.Move.find({});
});