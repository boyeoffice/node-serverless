const express = require('express');
const router = express.Router();
const UserData = require('../model/user');
const passport = require('passport');


router.get('/login', function(req, res, next) {
        var messages = req.flash('error');
        res.render('auth/login', { title: 'Login', layout: 'auth', csrfToken: req.csrfToken(), errors: messages, hasErrors: messages.length > 0});
    });
router.post('/login', passport.authenticate('local.login', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true
    
}));

router.get('/signup', function(req, res, next) {
    var messages = req.flash('error');
    res.render('auth/signup', { title: 'Signup', layout: 'auth', csrfToken: req.csrfToken(), errors: messages, hasErrors: messages.length > 0});
});
router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/cp',
    failureRedirect: '/auth/signup',
    failureFlash: true
}))

module.exports = router