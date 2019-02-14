const express = require('express')
const router = express.Router()
const User = require('../model/Test')

router.get('/', function(req, res, next) {
    User.find()
    .then(function(doc) {
      res.render('index', {items: doc, title: 'This is test page'})
  })
})

router.post('/insert', function(req, res, next) {
    var item = {
      title: req.body.title,
      content: req.body.content,
      author: req.body.auhtor
    }
     var data = new User(item)
     data.save();
     //User.create(req.body)
  
    res.redirect('/')
  })

  router.post('/update', function(req, res, ext) {
    var id = req.body.id
    User.findById(id, function(err, doc) {
      if(err){
        console.error('error, no entry found')
      }
      doc.title = req.body.title
      doc.content = req.body.content
      doc.author = req.body.auhtor
      doc.save()
    })
    res.redirect('/')
  })

  router.post('/delete', function(req, res, ext) {
    var id = req.body.id
    User.findByIdAndRemove(id).exec()
  res.redirect('/');
  });


module.exports = router