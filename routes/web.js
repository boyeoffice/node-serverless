var express = require('express')
var router = express.Router()
/*var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/test')
var Schema = mongoose.Schema*/

/* Controller */
const index = require('../controller/IndexController')
const test = require('../controller/TestController')

/*var userDataSchema = new Schema({
  title: {type: String, required: true},
  content: String,
  author: String
}, {collection: 'user-data'});

var UserData = mongoose.model('UserData', userDataSchema);*/


router.use('/', index)
router.use('/test', test)


module.exports = router;
