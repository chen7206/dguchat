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


// Soket.io : Signaling
app.io.route('ready', function(req) {
	req.io.join(req.data.chat_room);
	req.io.join(req.data.signal_room);
});

app.io.route('signal', function(req) {

	req.io.room(req.data.room).broadcast('signaling_message', {
		type: req.data.type,
		message: req.data.message
	});
});
