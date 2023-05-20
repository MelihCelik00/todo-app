var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
const port = process.env.PORT || 8080

require('dotenv').config();

const docs = require('./routes/swagger.route');

var app = express();
app.use('/api/documentation', docs.serve, docs.setup);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var apiRouter = require('./routes/api.route');

app.use(cors()); // essential for cors policy!
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRouter);

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
  res.render({ message: err.message });
});


app.listen(() => {
  console.log(`Server running on port http://localhost:${port}`)
});

module.exports = app;
