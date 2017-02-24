var express = require('express')
  , routes = require('./routes')
  , http = require('http');


var utils = require('utils');
//var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');



var nodemailer = require('nodemailer');
var request = require("request");
var utf8 = require('utf8');


// Database
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/nodetest2');

var mongo = require('mongodb');
var assert = require('assert');

// Initialize mongo integration must

var mongo = require('mongodb');
var connString = 'mongodb://bot:bot@ds056979.mlab.com:56979/builderbot';
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var dbm;
var collTrees;
var collPaths;
var collOpts;
var collUsers;


// Initialize connection once

mongo.MongoClient.connect(connString, function(err, database) {
  if(err) throw err;
 
  dbm = database;

  collTrees = dbm.collection('Trees');
  collPaths = dbm.collection('Paths');
  collOpts = dbm.collection('Opts');
  collUsers = dbm.collection('Users');

});






var routes = require('./routes/index');
var botadmin = require('./routes/botadmin');

var app = express();
var server = app.listen(8080);
var io = require('socket.io').listen(server);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/bower_components')));
app.use(express.static(path.join(__dirname, '/node_modules')));
app.use(express.static(path.join(__dirname, '/elements')));
app.use(express.static(path.join(__dirname, '/images')));

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

app.use('/', routes);
app.use('/botadmin', botadmin);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
