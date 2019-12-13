var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/adcomfort')

var Settings = require('../model/settings');

var setting = new Settings()
 setting.site_name = 'Adcomfort',
 setting.editMode = false

setting.save(function(err, result){
 if(err){
   return console.log('An error occurred')
 }
 return exit()
});

function exit() {
  mongoose.disconnect();
}
