const express = require('express');
const router = express.Router();
var Page = require('../model/post');

router.get('/', function(req, res, next) {
    Page.paginate({}, {page: 1, limit: 5}, function(err, result) {
        res.render('pages/index', {layout: 'backend', title: 'Pages', pages: result, csrfToken: req.csrfToken()});
    })
    
})

router.get('/create', function(req, res, next) {
    res.render('pages/create', {layout: 'backend', title: 'Create user', csrfToken: req.csrfToken()});
})

router.post('/store', function(req, res, next) {
    req.checkBody('title').withMessage('Title filed is required')
        .isLength({min: 4}).withMessage('Must be minimum of 4 char long');
    req.checkBody('description').withMessage('Description field is required')
        .isLength({min: 4}).withMessage('Must be minimum be char long');
    var errors = req.validationErrors();
    if(errors){
        var messages = [];
        errors.forEach(function(error) {
            messages.push(error.msg)
        });
        return res.status(422).json(messages)
    }
    var {title, description, status} = req.body;
    var newPage = new Page();
    newPage.title = title;
    newPage.description = description;
    newPage.status = status;
    newPage.post_type = 'page';
    newPage.save(function(err, result) {
        if(err){
            return res.status(500).json(err)
        }
        return res.status(200).end();
    })
});

router.get('/:pageId/edit', function(req, res, next) {
    Page.findOne({_id: req.params.pageId}, function(err, doc) {
        res.render('pages/edit', 
         {title: 'Edit page', layout: 'backend', page: doc, csrfToken: req.csrfToken()}
        );
    });
});

router.put('/:pageId', function(req, res, next) {
    req.checkBody('title').notEmpty().withMessage('Title field is required')
        .isLength({min: 4}).withMessage('Must be minimum of 4 char long');
    var errors = req.validationErrors();
    if(errors){
        var messages = [];
        errors.forEach(function(error){
            messages.push(error.msg)
        });
        return res.status(422).json(messages);
    }
    Page.findOne({_id: req.params.pageId}, function(err, doc) {
        doc.title = req.body.title;
        doc.description = req.body.description
        doc.status = req.body.status
        doc.updated_at = Date.now();
        doc.save(function(err, result){
            if(err){
               return res.status(500).json(err);
            }
            return res.status(200).end();
        });
    });
    
});

router.delete('/:pageId', function(req, res, next) {
    Page.findById(req.params.pageId)
        .remove()
        .exec()
        .then(result => {
            res.status(200).end();
        }).catch(error => {
            res.status(404).end();
        });
});

module.exports = router