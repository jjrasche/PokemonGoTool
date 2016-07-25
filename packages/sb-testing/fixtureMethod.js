var Future = Npm.require("fibers/future");


var clearDB = function clearDB(){
  console.log('Clear DB');

  var future = new Future();
  var collectionsRemoved = 0;
  var db = Meteor.users.find()._mongo.db;
  db.collections(function (err, collections) {

    // Filter out velocity and system.indexes from collections
    var appCollections = _.reject(collections, function (col) {
      return col.collectionName.indexOf('velocity') === 0 ||
        col.collectionName === 'system.indexes'
        // || col.collectionName === 'users';
    });

    // Remove each collection
    _.each(appCollections, function (appCollection, idx) {
      appCollection.remove(function (e) {
        if (e) {
          console.error('Failed removing collection', e);
          fut.return('fail: ' + e);
        }
        collectionsRemoved++;
        console.log('Removed collection: ', appCollection.collectionName, idx);
        if (idx+1 === appCollections.length) future.return();
        if (appCollections.length === collectionsRemoved) {
          // console.log('Finished resetting database');
        }
      });
    });
  });
  future.wait();
  console.log('Finished clearing');
}


Meteor.methods({
  resetTestingEnvironment: function resetTestingEnvironment(calledFrom) {
    console.log('resetTestingEnvironment called from: ' + calledFrom);
    if (process.env.VELOCITY_TEST_PACKAGES) {
      clearDB();
    } else {
      throw new Meteor.Error(
        'NOT_ALLOWED',
        'resetTestingEnvironment can only be executed in a Velocity mirror.'
      );
    }
  }
});