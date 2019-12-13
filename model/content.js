var mongoose = require('mongoose');
var ContentSchema = new mongoose.Schema({
  name: String,
  type: String,
  image: String,
  section: String,
  body: String,
  number: String
});

module.exports = mongoose.model('contents', ContentSchema);