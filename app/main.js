const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const Mongo = require("mongoose");
const cors = require("cors")
const { DB } = require('@narmy/core')
const confDb = require('../db/config')
const passport = require('passport')
const app = express();
const db = new DB(Mongo, confDb)
const path = require('path')
const { userApi, loginApi } = require('./routes')

// view engine setup
console.log(loginApi.getPrefixUrl())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(session({
    secret: 'mySecret',
    resave: false,
    saveUninitialized: false,
    secure: true
}))
app.use(passport.initialize())
app.use(passport.session())

// app.use('api/v1/event', apiRouter -> express.Router)
app.use(userApi.getPrefixUrl(), userApi.getRouter());
app.use(loginApi.getPrefixUrl(), loginApi.getRouter());




// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    console.error(err)
    res.json(err);
});

db.connect()

module.exports = app;
