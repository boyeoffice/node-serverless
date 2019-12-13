var mongoose = require('mongoose');
const SettingSchema = new mongoose.Schema({
  site_name: String,
  editMode: String
}, {collections: 'settings'});

module.export = mongoose.model('settings', SettingSchema);