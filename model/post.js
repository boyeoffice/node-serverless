var mongoose = require('mongoose');
var mongoosePagination = require('mongoose-paginate-v2');
const mongooseSlugPlugin = require('mongoose-slug-plugin');
var PostSchema = mongoose.Schema({
    medium_image: {type: String},
    large_image: {type: String},
    title: {type: String, required: true, unique: true},
    description: {type: String},
    post_type: {type: String},
    status: {type: String, default: 'deactivated'},
    created_at: {type: Date, default: Date.now()},
    updated_at: {type: Date, default: Date.now()}
}, {collection: 'posts'});

PostSchema.plugin(mongooseSlugPlugin, { tmpl: '<%=title%>' });
PostSchema.plugin(mongoosePagination);
module.exports = mongoose.model('posts', PostSchema);