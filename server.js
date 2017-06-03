// make express instance
var express = require('express.io');
var app = express();
app.http().io();

// set psort by heroku's dafult ports.
app.set('port', (process.env.PORT));

// set public folder (CSS, Javascript)
app.use(express.static(__dirname + '/public'));

// request and response function
app.get('/', function(req, res) {
	// request / then response index.ejs file.
	res.render('index');
});

// listen clients.
app.listen(app.get('port'));
