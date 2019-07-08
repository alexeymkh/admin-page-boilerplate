require('dotenv').config();
let express = require('express');
let cors = require('cors');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let apiV1 = require('./api/v1/routes/router');
let errors = require('./config/errors');

require('./db');

let app = express();
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '/public')))

app.use('/api/v1', apiV1);

app.get('/*', function (req, res, next) {
    res.sendfile('./public/index.html')
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next( errors.notFound );
});

// error handler
app.use(function(err, req, res, next) {

  const code = err.status || errors.internalServerError.status;
  const message = err.message || errors.internalServerError.message;
  const additional = err.additional;

  const errorInfo = { 
    code,
    success: false, 
    error: message, 
    additional
  };

  res.status(code).send(errorInfo);

});

module.exports = app;
