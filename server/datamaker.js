module.exports = function(User, Category, Kat, mongoose){
  var faker = require('faker');

  // delete all previous data
  User.remove({}, function(err){
    if(err) {
      console.log('Error deleting data from users');
    } else {
      console.log('Delete all data from users');
    }
  });


  var randomName = faker.name.findName(); 
  var randomAvatar = faker.image.avatar(); 
  // var randomCatURL = 
  // var randomTitle = faker.


  // Kat.remove({}, function(err){
  //   if(err) {
  //     console.log('Error deleting data from kats');
  //   } else {
  //     console.log('Delete all data from kats');
  //   }
  // });


  //// inserting new data 
  
  // var newUser = new User({
  //   username: 'JJ1'
  // });
  // newUser.save(function(err, user) {
  //   console.log('After saving user online', err, user);
  // });


};
