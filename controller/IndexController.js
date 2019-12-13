const express = require('express');
const router = express.Router();
const csrf = require('csurf');
const csrfProtection = csrf();
router.use(csrfProtection);
//var Page = require('../model/post');
const settings = require('../json_files/settings');
const home = require('../json_files/home');
const siteAbout = require('../json_files/about');
const sets = require('../model/settings');
const Contents = require('../model/content');

router.get('/', function(req, res, next) {
        res.render('index', {setting: settings, home: home, csrfToken: req.csrfToken()});
});

router.get('/about', (req, res, next) => {
        res.render('pages/about', {setting: settings, about: siteAbout});
});


router.post('/create_or_update', (req, res, done) => {
	res.redirect('/');
})


module.exports = router