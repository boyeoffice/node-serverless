const express = require('express');
const router = express.Router();
var Post = require('../model/post');

router.get('/', (req, res, next) => {
  res.redirect('/cp/manage/edit_home');
});

router.get('/edit_home', (req, res, next) => {
  Post.find({'post_type': 'homepage'}, (err, docs) => {
    res.render('manage/home', {
      title: 'Manage content',
       csrfToken: req.csrfToken(), 
       docs: docs,
      layout: 'backend'});
  })
  
});

module.exports = router;