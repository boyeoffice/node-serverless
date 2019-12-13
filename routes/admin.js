var express = require('express');
var router = express.Router();
const csrf = require('csurf');
const csrfProtection = csrf();

router.use(csrfProtection);


const dashboard = require('../controller/BackendController');
const users = require('../controller/UserController');
//const pages = require('../controller/PageController');
const manage = require('../controller/ManageController');
//const files = require('../controller/FileController')

//router.use('/files', isLoggedIn, files);
router.use('/manage', isLoggedIn, manage);
//router.use('/pages', isLoggedIn, pages)
router.use('/users', isLoggedIn, users);
router.use('/', isLoggedIn, dashboard);

module.exports = router;

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/');
}