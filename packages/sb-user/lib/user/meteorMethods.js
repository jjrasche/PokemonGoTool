Meteor.methods({
  findUserByEmail : function findUserByEmail(email) {
    var ret = UniqueAppAbbrevUpperCase.User.findOne({$and: [
            {'emails.address': {$in: [email]}}, 
            {'emails.address': {$exists: true}}
            ]});
    if (ret) return ret._id
  }

})