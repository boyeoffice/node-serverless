const passport = require('passport');
var User = require('../model/user');
const LocalStrategy = require('passport-local').Strategy;
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
       done(err, user); 
    });
});

passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done) {
    req.checkBody('email').notEmpty().withMessage('Email filed must not be empty')
        .isEmail().withMessage('Must be email only');
    req.checkBody('password').notEmpty().withMessage('Password must be empty')
        .isLength({min: 4}).withMessage('Password must be aleast 4 char long');
    req.checkBody('confirmPassword', 'Passwords do not match').equals(req.body.password);
    req.checkBody('name').isAlpha().withMessage('Name must be only alphabetical chars ')
        .notEmpty().withMessage('Name field is requied')
        .isLength({min: 3}).withMessage('Name must be at least 3 char long');
    var errors = req.validationErrors();
    if(errors) {
        var messages = [];
        errors.forEach(function(error) {
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    }
    User.findOne({'email': email}, function(err, user) {
        if(err) {
            return done(err);
        }
        if(user){
            return done(null, false, {message: 'Email is already in use'});
        }
        var newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        newUser.created_at = Date.now();
        newUser.updated_at = Date.now();
        newUser.name = req.body.name;
        newUser.status = 'deactivated';
        newUser.user_type = 'user';
        newUser.save(function(err, result) {
            if(err){
                return done(err);
            }
            return done(null, newUser);
        })
    });
}));

passport.use('local.login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done) {
    req.checkBody('email', 'Invalid email').notEmpty().withMessage('Email msut not be empty')
        .isEmail().withMessage('Must be email only');
    req.checkBody('password', 'Invalid password').notEmpty();
    var errors = req.validationErrors();
    if(errors) {
        var messages = [];
        errors.forEach(function(error) {
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    }
    User.findOne({'email': email}, function(err, user) {
        if(err) {
            return done(err);
        }
        if(!user){
            return done(null, false, {message: 'No user found.'});
        }
        if(!user.validPassword(password)) {
            return done(null, false, {message: 'Wrong password.'});
        }
        return done(null, user);
    });
}));