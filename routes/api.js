var express = require('express');
var router = express.Router();
var Content = require('../model/content');
var Jimp = require('jimp');
var multer = require('multer');
var _ = require('lodash');
var Post = require('../model/post');

var limits = {
  files: 1,
  fileSize: 1024 * 1024 * 1
}

var fileFilter = function(req, file, cb) {
  // supported image file mimetypes
  var allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png', 'image/gif'];
  
  if (_.includes(allowedMimes, file.mimetype)) {
  // allow supported image files
  cb(null, true);
  } else {
  // throw error for invalid files
  cb(new Error('Invalid file type. Only jpg, png and gif image files are allowed.'));
  }
  };

  var storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './public/upload')
    },
    filename: function(req, file, cb) {
      cb(null, new Date().toISOString() + file.originalname);
    }
  })

  var upload = multer({
    storage: storage,
    limits: limits,
    fileFilter: fileFilter
  })

router.post('/upload_image', upload.single('image'), (req, res, next) => {
  /*Jimp.read(req.file.path).then(image => {
    image.resize(Number(req.body.width), Number(req.body.height)).write(req.file.path).end();
  }).catch(error => {

  });*/
  Post.findOne({'title': req.body.title}, (err, post) => {
    if(err){
      res.status(422).json('An error occurred')
    }
    if(post){
      post.large_image = req.file.path;
      post.save();
    }else{
      var newPost = new Post();
      newPost.title = req.body.title;
      newPost.large_image = req.file.path;
      newPost.post_type = req.body.post_type
      newPost.save();
    }
  })
  
  res.status(200).json('Operations was successful');
});

module.exports = router;
