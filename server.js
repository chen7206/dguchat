// make express instance
var express = require('express');
var app = express();

// set port by heroku's dafult ports.
app.set('port', (process.env.PORT));

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
//  console.log('Node app is running on port', app.get('port'));
//});
