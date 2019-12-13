var mongoose = require('mongoose');
var Schema = mongoose.Schema({
    name: {type: String},
    medium: {type: String},
    large: {type: String},
    file_type: {type: String}
})

module.exports = mongoose.model('Image', Schema);