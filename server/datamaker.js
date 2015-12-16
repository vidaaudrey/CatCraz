module.exports = function(User, Category, Kat, mongoose){
  var faker = require('faker');   
  var catsURL = [
     'http://www.catgifpage.com/gifs/271.gif',
     'http://www.catgifpage.com/gifs/291.gif',
     'http://25.media.tumblr.com/tumblr_m4cxizzJjp1qze0hyo1_500.jpg',
     'http://27.media.tumblr.com/tumblr_m0926olz7D1rnzyn4o1_1280.jpg',
     'http://24.media.tumblr.com/tumblr_m3z8dufJDA1qjc1a7o1_1280.jpg',
     'http://29.media.tumblr.com/tumblr_ly4pyyiH8U1qh66wqo1_1280.jpg',
     'http://29.media.tumblr.com/tumblr_m1eco5JJzL1qbwvp8o1_500.gif',
     'http://24.media.tumblr.com/tumblr_m0xwwvn0l21ron8pyo1_1280.png', 
     'http://25.media.tumblr.com/tumblr_m15tl8tloF1r6kjkoo1_500.jpg', 
     'http://24.media.tumblr.com/tumblr_mb4s0gymFK1r189uao1_1280.jpg',
     // none API photos
     
     'http://www.catgifpage.com/gifs/310.gif',
     'http://www.catgifpage.com/gifs/307.gif',
     'http://www.catgifpage.com/gifs/306.gif',
     'http://www.catgifpage.com/gifs/303.gif',
     'http://www.catgifpage.com/gifs/276.gif',
     'http://www.catgifpage.com/gifs/309.gif'
   ];
   
  // delete all previous data
  User.remove({}, function(err){
    if(err) {
      console.log('Error deleting data from users');
    } else {
      console.log('Delete all data from users');

      Kat.remove({}, function(err){
        if(err) {
          console.log('Error deleting data from kats');
        } else {
          console.log('Delete all data from kats');
            for(var i = 0 ; i  < catsURL.length; i++){
              getCats(catsURL[i]); 
            }
        }
      });
    }
  });


  function getUser(){  
    var user = new User({
      username: faker.name.findName(),
      avatar: faker.image.avatar()
    }); 
    user.save(function(err, savedUser){
      console.log('new user saved', savedUser.username);
    });
    return user; 
  }

  function getCategory(){
    var newCategory = new Category({
      name: "New"
    });
    newCategory.save(function(err, cat) {
      console.log('category saved', err, cat);
    });
    return newCategory;
  }

  function getCats(url){
     var category = getCategory();

     var comments = [];
     for(var i  = 0; i <Math.random(10) * 10; i++){
        var cuser = getUser();
        comments.push({text: faker.lorem.sentences(), user: cuser});
     }

     var fans = [];
     for(var j  = 0; j <Math.random(10) * 10; j++){
        fans.push(getUser());
     }

     var newKat = new Kat({
       title: faker.name.findName(), 
       url: url,
       fans: fans,
       vote: fans.length,
       categories: [category],
       comments: comments
     });

     // var newKat = new Kat({
     //   title: faker.name.findName(), 
     //   url: url,
     //   fans: [user],
     //   categories: [category],
     //   comments: [{
     //       text: faker.lorem.sentences(),
     //       user: user
     //     }, {
     //       text: faker.lorem.sentences(),
     //       user: user1
     //     }
     //   ]
     // });
     newKat.save(function(err, kat) {
       console.log('kat saved', err, kat);
     });
  }

};
