var express = require('express');
var router = express.Router();
const csrf = require('csurf');
const csrfProtection = csrf();

router.use(csrfProtection);


/* Controller */
const index = require('../controller/IndexController');
const auth = require('../controller/AuthController');




router.use('/auth', notLoggedIn, auth);
router.use('/', index);


module.exports = router;

function notLoggedIn(req, res, next){
  if(!req.isAuthenticated()){
      return next()
  }
  res.redirect('/auth/login');
}
