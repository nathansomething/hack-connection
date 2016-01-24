"use strict";

var express = require('express');
var path = require('path');
var Api = require("rosette-api").Api;
var ArgumentParser = require("argparse").ArgumentParser;
var DocumentParameters = require("rosette-api").DocumentParameters;
var rosetteConstants = require("rosette-api").rosetteConstants;
var app = express();
var exphandle = require('express-handlebars');

var person1 = {name:"Emily", email:"hi@hotmail.com", phone:"12345324"};
var person2 =  {name:"Angela", email:"angela@hotmail.com", phone:"1245324"};
var person3 = {name:"Nathan", email:"nate@hotmail.com", phone:"1234534"};
var person4 = {name:"Emily", email:"hi@hotmail.com", phone:"12345324"};
var person5 = {name:"Emily", email:"hi@hotmail.com", phone:"45324"};
var person6 = {name:"Emily", email:"hi@hotmail.com", phone:"12324"};

var people = [person1, person2, person3, person4, person5, person6];

var exphelpers = exphandle.create({
	helpers: {
		grouped_each: function(every, context, options) {
			var out = "", subcontext = [], i;
			if (context && context.length > 0) {
				for (i = 0; i < context.length; i++) {
					if (i > 0 && i % every === 0) {
						out += options.fn(subcontext);
						subcontext = [];
					}
					subcontext.push(context[i]);
				}
				out += options.fn(subcontext);
			}
			return out;
		}
	}});

var parser = new ArgumentParser({
	  addHelp: true,
	  description: "Get the words in a piece of text"
	});
	parser.addArgument(["--key"], {help: "Rosette API key", required: true});

var basis_key = parser.parseArgs().key;
var basis_api = new Api(basis_key);

app.set('port', process.env.PORT || 3000);
app.configure(function() {
	app.use(express.bodyParser());
	app.use(app.router);
});

app.engine('handlebars', exphelpers.engine);
app.set('view engine', 'handlebars');
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
	var first_name = request.body.user.firstname;
	var last_name = request.body.user.lastname;
	var email = request.body.user.email;
	var phone_number = request.body.user.phonenumber;

	var all_text = request.body.user.bio + request.body.user.tech_background + request.body.user.project;
	var sentiment_data = {};
	var morpho_data = {};

	var morphofunc = function() {
		basis_api.morphology(all_text, rosetteConstants.morpholoyOutput.PARTS_OF_SPEECH, function(error, res) {
				if (error) {
					throw error;
				}
				else {
					morpho_data = res;
					console.log(morpho_data);
				}
			});
		};

	basis_api.sentiment(all_text, function(error, res) {
		if (error) {
			throw error;
		}
		else {
			sentiment_data = res;
			console.log(sentiment_data);
			morphofunc();

		}
	});
	result.redirect('/');
});

app.get('/browsing', function (request, result) {
	result.locals({
		title : 'Browsing'
	});
	result.render('browsing', {people: people});
});

app.listen(app.get('port'), function () {
	console.log('Example app listening on port ' + app.get('port') + '!');
});
