
var express = require('express');
var path = require('path');
var app = express();

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
	console.log(request.body.user.firstname);
	console.log(request.body.user.lastname);
	console.log(request.body.user.email);
	console.log(request.body.user.phonenumber);
	result.locals({
		title : 'Hack Connections'
	});
	result.render('index');
});

// app.get('/done', function(request, result) {
// 	result.render('index');
// });

app.listen(app.get('port'), function () {
  console.log('Example app listening on port ' + app.get('port') + '!');
});