var express = require("express");
var app = express();
var mongojs = require('mongojs');
var db2 = mongojs('brackets', ['brackets']);
var db = mongojs('contactlist', ['contactlist']);
var bodyParser = require('body-parser');
var router = express.Router();
var engines = require('consolidate');
var path = require('path');

module.exports = function(app, passport) {

    app.use(bodyParser.json());
    app.use(express.static(__dirname + "/public"));

    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user
        });
    });

    app.get('/view', isLoggedIn, function(req, res) {
        res.render('view.ejs', {
            user : req.user
        });
    });

    app.get('/view2', isLoggedIn, function(req, res) {
        res.render('view2.ejs', {
            user : req.user
        });
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/brackets', isLoggedIn, function(req, res) {
        res.render('brackets.ejs', {
            user : req.user
        });
    });

    app.get('/brackets2', isLoggedIn, function(req, res) {
        res.render('brackets2.ejs', {
            user : req.user
        });
    });

        app.get('/login', function(req, res) {
            res.render('login.ejs', { message: req.flash('loginMessage') });
        });

        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });

        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        app.get('/connect/local', function(req, res) {
            res.render('connect-local.ejs', { message: req.flash('loginMessage') });
        });

        app.post('/connect/local', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));
        
        app.get("/users", function (req, res) {
	        users.user.auth(function (err, docs) {
		      console.log(docs);
	   	    res.json(docs);
		  });
	   });

        app.get("/contactlist", function (req, res) {
	        console.log('recieved get request');
	    
	       db.contactlist.find(function (err, docs) {
		      console.log(docs);
		      res.json(docs);
		  });
	   });

        app.get("/bracketsSilly", function (req, res) {
            console.log('recieved get request');
        
           db2.brackets.find(function (err, docs) {
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

        app.post("/brackets2", function (req, res) {
           console.log(req.body);
           db2.brackets.insert(req.body,function(err, doc) {
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

        app.delete('/brackets2/:id', function (req, res) {
           var id = req.params.id;
           console.log(id);
           db2.brackets.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
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

        app.get('/brackets2/:id', function (req, res) {
           var id = req.params.id;
           console.log(id);
            db2.brackets.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
               res.json(doc);
          });
       });

        app.get('/view2/:id', function (req, res) {
           var id = req.params.id;
           console.log(id);
            db2.brackets.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
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
		  });
	   });

        app.put('brackets2/:id', function (req, res) { 
           var id = req.params.id;
           console.log(req.body.round1a);
           db2.brackets.findAndModify({query: {_id: mongojs.ObjectId(id)},
             update: {$set: {round1a: req.body.round1a, round1b: req.body.round1b, round1c: req.body.round1c, round1d: req.body.round1d, round1e: req.body.round1e, round1f: req.body.round1f, round1g: req.body.round1g, round1h: req.body.round1h, round2a: req.body.round2a, round2b: req.body.round2b, round2c: req.body.round2c, round2d: req.body.round2d, round3a: req.body.round3a, round3b: req.body.round3b, winner: req.body.winner}},
             new: true}, function (err, doc) {
              res.json(doc);
          });
       });

        
};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}
