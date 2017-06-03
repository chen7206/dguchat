// make express instance
var express = require('express.io');
var app = express();
app.http().io();

// set psort by heroku's dafult ports.
app.set('port', (process.env.PORT));

// set public folder (CSS, Javascript)
app.use(express.static(__dirname + '/public'));

// request and response function
app.get('/', function(request, response) {
	// request / then response index.ejs file.
	response.render('index');
});

// listen clients.
app.listen(app.get('port'));

// singaling using websocket
app.io.route('signal', function(req) {

	req.io.room(req.data.room).broadcast('signaling_meesage', {
		type: req.data.type,
		message: req.data.message
	});
})
