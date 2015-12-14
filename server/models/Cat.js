var mongoose = require('mongoose');


var CatSchema = new mongoose.Schema({
    url: {
        type: String, 
        required: true
    }
});

module.exports = CatSchema;
