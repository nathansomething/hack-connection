
var express = require('express');
var path = require('path');
var Api = require("rosette-api").Api;
var ArgumentParser = require("argparse").ArgumentParser;
var DocumentParameters = require("rosette-api").DocumentParameters;
var app = express();

var parser = new ArgumentParser({
	  addHelp: true,
	  description: "Get the words in a piece of text"
	});
	parser.addArgument(["--key"], {help: "Rosette API key", required: true});

var basis_key = parser.parseArgs().key;
var basis_api = new Api(basis_key);

app.set('port', process.env.PORT || 3000);
app.engine('jshtml', require('jshtml-express'));
app.configure(function() {
	app.use(express.bodyParser());
	app.use(app.router);
});

app.engine('jshtml', require('jshtml-express'));
app.set('view engine', 'jshtml');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (request, result) {
	result.locals({
		title : 'Hack Connections'
	});
	result.render('index');
});

app.get('/register', function (request, result) {
	result.locals({
		title : 'Register'
	});
	result.render('register');
});

app.post('/', function (request, result) {
	console.log('first name: ' + request.body.user.firstname);
	console.log('last name: ' + request.body.user.lastname);
	console.log('email: ' + request.body.user.email);
	console.log('phone number: ' + request.body.user.phonenumber);
	"use strict";

	basis_api.tokens(request.body.user.bio, function(error, result) {
	  if (error) {
	    throw error;
	  }
	  else {
	     console.log(result);
	  }
	});

	basis_api.tokens(request.body.user.tech_background, function(error, result) {
	  if (error) {
	    throw error;
	  }
	  else {
	     console.log(result);
	  }
	});

	basis_api.tokens(request.body.user.project, function(error, result) {
	  if (error) {
	    throw error;
	  }
	  else {
	     console.log(result);
	  }
	});

	result.locals({
		title : 'Browsing'
	});
	result.render('browsing');
});

// app.get('/done', function(request, result) {
// 	result.render('index');
// });

app.listen(app.get('port'), function () {
  console.log('Example app listening on port ' + app.get('port') + '!');
});