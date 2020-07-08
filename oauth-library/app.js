require('dotenv').config();
var express = require('express');

var app = express();
var multer = require('multer')
var constants = require('constants');
var constant = require('./config/constants');


// var mongoose = require('mongoose');
var flash = require('connect-flash');
var path = require('path');

// var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
// var dateFormat = require('dateformat');
var now = new Date();

const middleware = require('./app/middleware');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


/***************Mongodb configuratrion********************/
// var configDB = require('./config/database.js');
//configuration ===============================================================
// mongoose.connect(configDB.url); // connect to our database

//set up our express application
// app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
//app.use(bodyParser()); // get information from html forms

//view engine setup
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'resources/views'));
app.set('view engine', 'hbs');
//app.set('view engine', 'ejs'); // set up ejs for templating


//required for passport
//app.use(session({ secret: 'iloveyoudear...' })); // session secret

app.use(session({
    secret: 'I Love India...',
    resave: true,
    saveUninitialized: true
}));

app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./config/routes.js')(app,middleware); // load our routes and pass in our app and fully configured passport

//catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.status(404).render('errors/404', {title: "Sorry, page not found", session: req.sessionbo,layout:false});
});

app.use(function (req, res, next) {
    res.status(500).render('500', {title: "A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.",layout:false});
});
exports = module.exports = app;






















