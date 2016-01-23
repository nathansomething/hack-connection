
var express = require('express');
var app = express();
app.set('port', process.env.PORT || 3000);
app.engine('jshtml', require('jshtml-express'));
app.configure(function() {
	app.use(express.bodyParser());
	app.use(app.router);
});

app.engine('jshtml', require('jshtml-express'));
app.set('view engine', 'jshtml');

app.get('/', function (req, res) {
	res.locals({
		title : 'Test!'
		, message : 'De groeten'
	});
	res.render('index');
});

app.listen(app.get('port'), function () {
  console.log('Example app listening on port ' + app.get('port') + '!');
});