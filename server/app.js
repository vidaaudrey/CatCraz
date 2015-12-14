var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var _ = require('lodash');
var restful = require('node-restful');


// Create the application.
var app = express();

// Add Middleware necessary for REST API's
app.use(bodyParser.urlencoded({extended: true}));
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


// curl -i http://localhost:3000/cats/
// curl -d '{"title": "King", "year": "1932"}' -H "Content-Type:application/json" http://localhost:3000/cats/ -X DELETE

var Cat = app.cat = restful.model('cat', mongoose.Schema({
    title: String,
    url: String, 
    vote: 0
  }))
  .methods(['get', 'post', 'put', 'delete']);

Cat.register(app, '/cats');


app.get('/',  function(req, res){
    res.end('ok');
});