// make express instance
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// set psort by heroku's dafult ports.
app.set('port', (process.env.PORT));

// set public folder (CSS, Javascript)
app.use(express.static(__dirname + '/public'));

// request and response function
app.get('/', function(req, res) {
	// request / then response index.ejs file.
	res.render('index.ejs');
});

// listen clients.
app.listen(app.get('port'));
