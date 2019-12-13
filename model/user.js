const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
var mongoosePagination = require('mongoose-paginate-v2');
var UserSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    name: String,
    password: {type: String},
    created_at: {type: Date},
    updated_at: {type: Date},
    user_type: String,
    status: String
 }, {collection: 'users'});

 UserSchema.methods.encryptPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null)     
 }

 UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);    
 }

 UserSchema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.password;
    return obj;
 }
 UserSchema.plugin(mongoosePagination);
module.exports = mongoose.model('users', UserSchema);
