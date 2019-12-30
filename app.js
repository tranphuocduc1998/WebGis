var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//Api Routes 
var areaAPI = require('./api/routes/area.route');
var pointAPI = require('./api/routes/point.route');
var lineAPI = require('./api/routes/line.route');
var studentsAPI = require('./api/routes/students.route');
//Routes View 
var loginAdmin = require('./routes/secure/login.route');
var indexAdmin = require('./routes/secure/index.route');
var areaAdmin = require('./routes/secure/area.route');
var studentsAdmin = require('./routes/secure/students.route');
var accountAdmin =require('./routes/secure/account.route');
var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("secret"));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/area', areaAPI);
app.use('/api/point', pointAPI);
app.use('/api/line', lineAPI);
app.use('/api/students', studentsAPI);
app.use('/', indexRouter);
app.use('/signin', loginAdmin);
app.use('/admin', indexAdmin);
app.use('/admin/area', areaAdmin);
app.use('/admin/students', studentsAdmin);
app.use('/admin/account', accountAdmin);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
