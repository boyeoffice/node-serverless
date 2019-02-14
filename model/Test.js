const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({

  title: {type: String, required: true},
  content: String,
  author: String

}, {collection: 'user-data'})
module.exports = mongoose.model('User', UserSchema)


