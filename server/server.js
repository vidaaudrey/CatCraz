var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var _ = require('lodash');
var restful = require('node-restful');
var Schema = mongoose.Schema;

// Create the application.
var app = express();
app.use(express.static('client'));
// Add Middleware necessary for REST API's
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));

// CORS Support
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

mongoose.connect('mongodb://audrey:audrey@ds029595.mongolab.com:29595/catcraz')
  .connection.once('open', function() {
    console.log('Connected to mongolab, and listening on port 3000...');
    app.listen(3000);
  });

var UserSchema = new Schema({
  username: String,
  avatar: String
});

var CategorySchema = new Schema({
  name: String
});

var KatSchema = new Schema({
  title: String,
  url: {
    type: String
  },
  vote: {
    type: Number,
    default: 0
  },
  fans: [UserSchema],
  categories: [CategorySchema],
  comments: [{
    text: {
      type: String,
      required: true
    },
    user: UserSchema
  }],
  modified: {
    type: Date,
    default: Date.now
  }
});



var Kat = app.kat = restful.model('kat', KatSchema).methods(['get', 'post', 'put', 'delete']);
var User = app.user = restful.model('user', UserSchema).methods(['get', 'post', 'put', 'delete']);
var Category = app.category = restful.model('categories', CategorySchema).methods(['get', 'post', 'put', 'delete']);

// clean and use fake data to fill up the db 
require('./datamaker')(User, Category, Kat, mongoose);


Kat.register(app, '/cats');
User.register(app, '/users');
Category.register(app, '/categories');





// var UserSchema = new Schema({
//   username: String,
//   avatar: String
// });
// var CategorySchema = new Schema({
//   name: String
// });

// var CommentSchema = new Schema({
//   text: { type: String, required: true}, 
//   user: UserSchema
// });

// var KatSchema = new Schema({
//   title: String,
//   url: {
//     type: String
//   },
//   vote: {
//     type: Number,
//     default: 0
//   },
//   fans: [UserSchema],
//   categories: [CategorySchema],
//   comments: [{
//       text: {
//         type: String,
//         required: true
//       },
//       user: UserSchema
//     }], 
//     modified: { type: Date, default: Date.now }
// });

// var User = mongoose.model('cats', UserSchema);
// var Category = mongoose.model('categories', CategorySchema);
// var Comment = mongoose.model('comments', CommentSchema);
// var Kat = mongoose.model('kats', KatSchema);
// var newUser = new User({
//   username: 'Audrey'
// });


// newUser1.save(function(err, user) {
//   console.log('After saving user online', err, user);
// });
// var newCategory = new Category({
//   name: "Popular"
// });
// newCategory.save(function(err, cat) {
//   console.log('category saved', err, cat);
// });

// var newComment = new Comment({
//     text: "Cool", 
//     user: newUser
// });
// newComment.save(function(err, comment){
//     console.log('comment saved', err, comment);
// });

// var newKat = new Kat({
//   title: "Cool lulu",
//   url: "http://29.media.tumblr.com/tumblr_ly4pyyiH8U1qh66wqo1_1280.jpg",
//   fans: [newUser, newUser1],
//   categories: [newCategory],
//   comments: [{
//       text: "Cool",
//       user: newUser
//     }, {
//       text: "Cute cat!",
//       user: newUser1
//     }
//   ]
// });
// newKat.save(function(err, kat) {
//   console.log('kat saved', err, kat);
// });




// User.register(app, '/users');

// var Cat = app.cat = restful.model('cat', mongoose.Schema({
//     title: String,
//     url: String,
//     vote: 0,
//     fans: {
//       text: String,
//       username: String,
//       avatar: String
//     }
//   }))
//   .methods(['get', 'post', 'put', 'delete']);

// Cat.register(app, '/cats');



// app.get('/cats', function(req, res, next) {
//   Kat.find({}, function(err, cats) {
//     res.end('ok', cats);
//   });
// });

// db.cat.insert({title: "The King", url: "http://29.media.tumblr.com/tumblr_ly4pyyiH8U1qh66wqo1_1280.jpg", vote: 0,  fans: [{text: "Cute cata!", username: "Audrey", avatar: "svg-1"}, {username: "Otto", avatar: "svg-2"}], content: "Something to fill later"})


// var User = app.user = restful.model('user', mongoose.Schema({
//     name: String
//   }))
//   .methods(['get', 'post', 'put', 'delete']);


// var Cat = app.cat = restful.model('cat', mongoose.Schema({
//     title: String,
//     url: String,
//     vote: 0,
//     fans: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User'
//     },
//     comments: {
//       text: String,
//       postedBy: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User'
//       }
//     }
//   }))
//   .methods(['get', 'post', 'put', 'delete']);

// User.register(app, '/users');



// curl -XPOST "http://localhost:3000/cats/" -d'
// {
//    "title": "The Matrix",
//    "url": "http://29.media.tumblr.com/tumblr_ly4pyyiH8U1qh66wqo1_1280.jpg", 
//    "avatar": "svg-1", 
//    "content": "something", 
//    "fans": [
//     {"type": "566f518092bb6853c7631fe1"}
//     ], 
//     "comments": [
//       {"text": "Cute cat!", "postBy": "566f518092bb6853c7631fe1"},
//       {"text": "Not cool!", "postBy": "566f518092bb6853c7631fe1"}
//     ] 
// }'


// add a new cat record 
// curl -d '{"name": "King", "url": "http://29.media.tumblr.com/tumblr_ly4pyyiH8U1qh66wqo1_1280.jpg", "avatar": "svg-1", "content": "something", "fans": [{"type": "566f518092bb6853c7631fe1"}], "comments": [{"text": "Cute cat!", "postBy": "566f518092bb6853c7631fe1"}, {"text": "Not cool!", "postBy": "566f518092bb6853c7631fe1"}] }' -H "Content-Type:application/json" http://localhost:3000/cats/ 


//curl -d '{"name": "King", "url": "http://29.media.tumblr.com/tumblr_ly4pyyiH8U1qh66wqo1_1280.jpg", "avatar": "svg-1", "content": "something", "fans": {"type": "566f518092bb6853c7631fe1"} }' -H "Content-Type: application/json" http://localhost:3000/cats/ 


// curl -i http://localhost:3000/cats/
// curl -d '{"title": "King", "year": "1932"}' -H "Content-Type:application/json" http://localhost:3000/cats/ -X DELETE

// curl -i http://localhost:3000/users/
// curl -d '{"username": "Audrey"}' -H "Content-Type:application/json" http://localhost:3000/users/ 
// {"__v":0,"_id":"566f518092bb6853c7631fe1"}%  

// delete cat by id
// curl -d '{"_id":"566f518092bb6853c7631fe1" }' -H "Content-Type:application/json" http://localhost:3000/cats/ -X DELETE



// app.get('/',  function(req, res){
//     res.end('ok');
// });