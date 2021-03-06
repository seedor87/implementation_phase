// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var mongojs  = require('mongojs');
var db       = mongojs('contactlist', ['contactlist']);
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/database.js');

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// db functions ===============================================================
app.get("/contactlist", function (req, res) {
	console.log('recieved get request');
	
	db.contactlist.find(function (err, docs) {
		console.log(docs);
		res.json(docs);
	    });
    });

app.post("/contactlist", function (req, res) {
	console.log(req.body);
	db.contactlist.insert(req.body,function(err, doc) {
		res.json(doc);
	    });
    });

app.delete('/contactlist/:id', function (req, res) {
	var id = req.params.id;
	console.log(id);
	db.contactlist.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
		res.json(doc);
	    });
    });

app.get('/contactlist/:id', function (req, res) {
	var id = req.params.id;
	console.log(id);
	db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
		res.json(doc);
	    });
    });

app.put('/contactlist/:id', function (req, res) {
	var id = req.params.id;
	console.log(req.body.round1a);
	db.contactlist.findAndModify({query: {_id: mongojs.ObjectId(id)},
		    update: {$set: {round1a: req.body.round1a, round1b: req.body.round1b, round1c: req.body.round1c, round1d: req.body.round1d, round2a: req.body.round2a, round2b: req.body.round2b, winner: req.body.winner}},
		    new: true}, function (err, doc) {
		res.json(doc);
	    }
	    );
    });

app.get('/view/:id', function (req, res) {
	console.log("recieved view request");
	var id = req.params.id;
	console.log(id);
	db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
		res.json(doc);
	    });
    });

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
