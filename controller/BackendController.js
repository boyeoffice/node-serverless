const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
        res.render('cp', { title: 'Dashboard', layout: 'backend'});
});

router.get('/logout', function(req, res, next) {
     req.logout();
     res.redirect('/auth/login');   
})

module.exports = router