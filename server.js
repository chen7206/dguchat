// make express instance
var express = require('express');
var app = express();

// set psort by heroku's dafult ports.
//app.set('port', (process.env.PORT));

// set public folder (CSS)
app.use(express.static(__dirname + '/public'));

// set views folder (ejs)
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// request and response function
app.get('/', function(request, response) {
	// request / then response index.ejs file.
	response.render('index');
});

// listen clients.
//app.listen(app.get('port'), function() {
//	
//});

// listen 443 port
app.listen(443);

// listen 80 port
app.listen(80);
