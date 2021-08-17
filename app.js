var express = require('express');
var cookieParser = require("cookie-parser")
var logger = require('morgan');
const mongoose = require('mongoose')
const cors = require('cors')

var app = express()

mongoose
  .connect("mongodb://localhost:27017/groceries-backend-hooks-context", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((e) => {
    console.log(e);
  });

  //Schema
const groceriesRouter = require('./routes/groceryList/groceriesRouter')

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//api to use mongoose schema
app.use('/api/groceries', groceriesRouter);

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
  res.json('error');
});

module.exports = app;
