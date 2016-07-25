/*    PROBLEMS
  double call of 'resetTestingEnvironment' likely due to something like
    https://github.com/meteor/meteor/issues/4263
  SOLUTION: separating clearDB and initializeData functions 'fixed'
*/


describe("portal page UI tests", function() {
  // reset DB
  beforeAll(function(done) {
    Meteor.call('resetTestingEnvironment', 'portalTestPage.js', function(err, res) {
      console.log('resetTestingEnvironment: ', err, res);
      done();
    });
  });
  beforeAll(function(done) {
    Meteor.call('initializeFixutres', function(err, res) {
      console.log('initializeFixutres: ', err, res);
      done();
    });
  });
  beforeAll(function (done) {
    var user = UniqueAppAbbrevUpperCase.fixture.tester2;
    Meteor.loginWithPassword(user.email, user.password, function(err){
      console.log('1');
      Router.go('UniqueAppAbbrevLowerCasePortalMainPage');
      Tracker.afterFlush(done);
      done();
    });
  });
  beforeAll(waitForRouter);

  // example
  // it("creating a board adds it to usersBoardList", function(done) {
  //   var userID = UniqueAppAbbrevUpperCase.User.findOne({username : UniqueAppAbbrevUpperCase.fixture.tester2.username})._id;
  //   Meteor.call('createBoard', 'tester2\'s board', userID, function(err, res){
  //     console.log($('.UniqueAppAbbrevLowerCasePortalUsersBoard').length, UniqueAppAbbrevUpperCase.User.user().username);
  //     expect($('.UniqueAppAbbrevLowerCasePortalUsersBoard').length).toEqual(1);
  //     Tracker.afterFlush(done);
  //   });
  // });

}); 