var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//event parser and mongodb should be placed here
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//var GatewayRouter = require('./routes/gateway');
 
var app = express();

// Templating more ideal for a portfolio 
// view engine setup


//app.set('views', path.join(__dirname, 'views'));
//app.engine('html', require('ejs').renderFile);
//app.set('view engine', 'html');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/testApi', usersRouter);

//app.use('/gateway',GatewayRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // display the error page
  res.status(500).json ({message: err.message, error: err});

});
module.exports = app;
