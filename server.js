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
	res.render('index.ejs');
});

// listen clients.
app.listen(app.get('port'));

// Signal
app.io.route('signal', function(req) {
	req.io.join(req.data);
	app.io.room(req.data).broadcast('signal', {
		user_type: req.data.user_type,
		user_name: req.data.user_name,
		user_data: req.data.user_data,
		command: req.data.command
	});
});
