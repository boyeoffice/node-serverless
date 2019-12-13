var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('express-handlebars');
//var favicon = require('serve-favicon');
var mongoose = require('mongoose')
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var helmet = require('helmet');
var validator = require('express-validator');
var MongoStore = require('connect-mongo')(session);


require('./lib/db');
require('./config/passport');

var apiRoute = require('./routes/api');
var webRouter = require('./routes/web');
var adminRoute = require('./routes/admin');
//var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.engine('hbs', hbs({
  extname: 'hbs',
  defaultLayout: 'layout', 
  layoutsDir: __dirname + '/views/layouts/',
  helpers: {
    section: function(name, options) {
      if(!this._sections){
        this._sections = {}
      }
      this._sections[name] = options.fn(this)
      return null;
    },
    json: function(context) {
      return JSON.stringify(context);
    }
  }
  
})); 
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(validator());
app.use(helmet());
app.use(cookieParser());
app.use(session({
  name: 'adcomfort_session',
  secret: 'adcomfort_session', 
  resave: false, 
  saveUninitialized: false,
  store: new MongoStore({mongooseConnection: mongoose.connection}),
  cookie: { maxAge: 180 * 60 * 1000 }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(function(req, res, next) {
  res.locals.login = req.isAuthenticated();
  res.locals.session = req.session;
  res.locals.user = req.user;
  next()
})
app.use('/api', apiRoute);
app.use('/cp', adminRoute);
app.use('/', webRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
/*app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  //res.status(err.status || 500);
  res.render('errors/404');
  //if (err.code !== 'EBADCSRFTOKEN') return next(err)

  // handle CSRF token errors here
  //res.status(401).json('unauthoraized');
});
*/

if(app.get('env') === 'development'){
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('errors/404', {
      message: err.message,
      error: err,
      helper: hbs.helper
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('errors', {
    message: err.message,
    error: {},
    helpers: hbs.helper
  })
})
module.exports = app;
