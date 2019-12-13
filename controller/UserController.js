const express = require('express')
const router = express.Router()
var User = require('../model/user');

router.get('/', function(req, res, next) {
     /*User.find(function(err, docs) {
         var userChunks = [];
         var chunkSize = 3;
         for(var i = 0; i < docs.length; i += chunkSize){
             userChunks.push(docs.slice(i, i + chunkSize));
         }
        res.render('users/index', {title: 'Users', layout: 'backend', users: userChunks, csrfToken: req.csrfToken()});
    });*/
    const {page, limit} = req.query;
    const options = {
        page: parseInt(page, 10) || 1,
        limit: parseInt(limit, 10) || 3
    }
    User.paginate({}, options, function(err, result) {
        res.render('users/index', {title: 'Users', users: result, layout: 'backend', csrfToken: req.csrfToken()});
    })
});

router.get('/users-json', function(req, res, next) {
    const {page, limit} = req.query;
    const options = {
        page: parseInt(page, 10) || 1,
        limit: parseInt(limit, 10) || 6
    }
    User.paginate({}, options, function(err, result){
        res.status(200).json(result);
    });
});

router.get('/create', function(req, res, next) {
    res.render('users/create', {title: 'Create users', csrfToken: req.csrfToken(), layout: 'backend'});
});

router.post('/store', function(req, res, next) {
    req.checkBody('email').notEmpty().withMessage('Email filed must not be empty')
        .isEmail().withMessage('Must be email only');
    req.checkBody('password').notEmpty().withMessage('Passsword field is required')
        .isLength({min: 4}).withMessage('Password must be of 4 minimum chars');
    req.checkBody('name').notEmpty().withMessage('Name field is required')
        .isLength({min: 4}).withMessage('Name must be minimum of 4 char');
    req.checkBody('confirmPassword').equals(req.body.password).withMessage('Password does not match')
    var errors = req.validationErrors();
    if(errors) {
        var messages = [];
        errors.forEach(function(error) {
            messages.push(error.msg);
        });
        return res.status(422).json(messages);
     }
     var {email, name, password, user_type, status} = req.body;
     User.findOne({'email': email}, function(err, user) {
         if(err){
           return res.status(500).json(err);
         }
         if(user) {
             return res.status(409).json('Email is already in use');
         }
         var newUser = new User();
         newUser.email = email;
         newUser.name = name;
         newUser.password = newUser.encryptPassword(password);
         newUser.created_at = Date.now();
         newUser.updated_at = Date.now();
         newUser.status = status;
         newUser.user_type = user_type;
         newUser.save(function(err, result){
             if(err){
                 return res.status(500).json(err);
             }
             return res.status(200).end();
         })
     })
    
        
});

router.get('/:userId/edit', function(req, res, next) {
    User.findOne({_id: req.params.userId}, function(err, doc) {
        res.render('users/edit', {title: 'Edit user', layout: 'backend', csrfToken: req.csrfToken(), user: doc}); 
    }); 
});

router.put('/:userId', function(req, res, next) {
    var id = req.params.userId;
    var passw = req.body.password;
    if(passw){
        req.checkBody('password', 'Invalid password').notEmpty().isLength({min: 4});
        req.checkBody('confirmPassword', 'Passwords do not match').equals(req.body.password);
        var errors = req.validationErrors();
        if(errors) {
            var messages = [];
            errors.forEach(function(error) {
                messages.push(error.msg);
            });
            return res.status(422).json(messages);
        }
    }
    req.checkBody('email').notEmpty().withMessage('Email field is required')
        .isEmail().withMessage('Must be email only');
    req.checkBody('name').notEmpty().withMessage('Name field is required')
        .isLength({min: 3}).withMessage('Must be minimum of 3 char');
    var errors = req.validationErrors();
    if(errors) {
        var messages = [];
        errors.forEach(function(error) {
            messages.push(error.msg);
        });
        return res.status(422).json({errors:  messages});
     }
     /*User.findOne({email: req.body.email}, function(err, user){
         if(user){
             return res.status(422).json({
                 error: 'Email al'
             })
         }
     })*/
    User.findById(id, function(err, doc) {
       if(err){
           return res.status(404).json('No user found');
       }
       if(passw) {
           var modifyPass = doc.encryptPassword(passw);
       }else{
           var modifyPass = doc.password
       }
       doc.name = req.body.name;
       doc.email = req.body.email;
       doc.updated_at = Date.now();
       doc.password = modifyPass;
       doc.user_type = req.body.user_type;
       doc.status = req.body.status;
       doc.save(function(err, result) {
           if(err){
               return res.status(500).json(err);
           }
        return res.status(200).end();
       })
    })
})

router.delete('/:userId', function(req, res, next) {
    var id = req.params.userId;
    User.findById(id)
        .remove()
        .exec()
        .then(result => {
           return res.status(200).json({messages: 'User deleted'});
        }).catch(error => {
           return res.status(404).json({messages: 'User not found'});
        });
});

module.exports = router
