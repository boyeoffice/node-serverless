var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/adcomfort')

var Page = require('../model/post');

var pages = [ 
    new Page({
        imagePath: 'http://boyeoffice.test/img/stich.jpg',
        title: 'Gallery',
        description: 'This is description',
        post_type: 'page',
        status: 'active'
    }),
    new Page({
        imagePath: 'http://boyeoffice.test/img/stich.jpg',
        title: 'Services',
        description: 'This is description',
        post_type: 'page',
        status: 'active'
    }),
    new Page({
        imagePath: 'http://boyeoffice.test/img/stich.jpg',
        title: 'About',
        description: 'This is description',
        post_type: 'page',
        status: 'active'
    }),
    new Page({
        imagePath: 'http://boyeoffice.test/img/stich.jpg',
        title: 'Contact',
        description: 'This is description',
        post_type: 'page',
        status: 'active'
    }),
];
var done = 0;
for(var i = 0; i < pages.length; i++) {
    pages[i].save(function(err, result){
        done++;
        if(done === pages.length){
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}

