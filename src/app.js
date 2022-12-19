require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

const methodOverride = require('method-override');
const session = require('express-session');

// Middleware
const cookieCheck = require('./middlewares/cookieCheck');
const localsUserCheck = require('./middlewares/localsUserCheck');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var authRouter = require('./routes/auth');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..','public')));


app.use(cors());
app.use(methodOverride('_method'))
app.use(session({
  secret : 'MoonWalking',
  resave : false,
  saveUninitialized : true
}));
app.use(cookieCheck); // si existe la cookie
app.use(localsUserCheck); // si existe sesión


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/auth', authRouter);


app.use('/api/products/', require('./routes/api/apiProducts'))
app.use('/api/users/', require('./routes/api/apiUsers'))
app.use('/api/categories/', require('./routes/api/apiCategories'))
app.use('/api/ext', require('./routes/api/apiExt'))
app.use('/api/carts', require('./routes/api/apiCart'))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
