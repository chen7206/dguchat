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



/*
	Sockets and Rooms
*/
var socketIds = {};
var rooms = {};
var roomId = null;


// 소켓에 연결된 클라이언들의 이벤트 처리
io.on('connection', function(socket) {

	// 채팅 방 참여 이벤트
	socket.on('joinRoom', function(roomName, userId) {
		
		roomId = roomName;
		socket.join(roomId);

		// 룸에 사용자 정보 추가
		if(rooms[roomId]) {
			console.log('이미 존재하는 방인 경우');
			rooms[roomId][socket.id] = userId;
		} else {
			console.log('새로운 방인 경우');
			rooms[roomId] = {};
			rooms[roomId][socket.id] = userId;
		}

		// 유저 정보 추가
		thisRoom = rooms[roomId];
		io.sockets.in(roomId).emit('joinRoom', roomId, thisRoom);
	});// END - socket.on('joinRoom', function(roomName, userId)


	// 데이터 메세지 이벤트
	socket.on('message', function(data) {

		if(data.to == 'all') {
			socket.broadcast.to(data.roomId).emit('message', data);
		} else {
			var targetSocketId = socketIds[data.to];
			if(targetSocketId) {
				io.to(targetSocketId).emit('message', data);
			}
		}
	});// END - socket.on('message', function(data)

	
	// 연결이 끊겼을때 이벤트
	socket.on('disconnect', function() {

		var roomId;

		var arr = Object.keys(rooms);
		var result = null;
		for(var i=0; i < arr.length; i++) {
			if(rooms[arr[i]][socket.id]) {
				result = arr[i];
				break;
			}
		}
		roomId = result;

		if(roomId) {
			socket.broadcast.to(roomId).emit('leaveRoom', rooms[roomId][socket.id]);
			delete rooms[roomId][socket.id];
		}
	});
});// END - io.on('connection', function(socket)'



// listen clients.
http.listen(app.get('port'));
