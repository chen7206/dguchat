var connection = new RTCMultiConnection();

connection.socketURL = 'https://dguchat.herokuapp.com:443/';

connection.session = {
	audio:true,
	video:true
};

connection.sdpConstraints.mandatory = {
	OfferToReceiveAudio : true,
	OfferToReceiveVideo : true
};


var localVideoContainer = document.getElementById('local-videos-container');
var remoteVideoContainer = document.getElementById('remote-videos-container');

connection.onstream = function(event) {

	var video = event.mediaElement;

	if(event.type == 'local') {
		localVideoContainer.appendChild(video);
		//video.play();
	}

	if(event.type == 'remote') {
		console.log("!!!");
		remoteVideoContainer.appendChild(video);
		//video.play();
	}
};


var roomid = document.getElementById('text-roomid');
document.getElementById('btn-open-or-join-room').onclick = function() {
	this.disabled = true;

	var chkPublic = document.getElementById('chk_public_room').checked;
	var isPublicModerator = false;
	if(chkPublic == true)
		var isPublicModerator = true;

        connection.open(roomid.value || 'predefined-roomid', isPublicModerator);
	displayNone();

};



var publicRoomsDiv = document.getElementById('public-rooms');
	(function looper() {
		// connection.getPublicModerators(startsWith, callback)
		connection.getPublicModerators(function(array) {
			publicRoomsDiv.innerHTML = '';
			array.forEach(function(moderator) {
				// moderator.userid
				// moderator.extra
				if(moderator.userid == connection.userid) return; // if owner himself

				var li = document.createElement('li');
				li.setAttribute("id", "public-room");

				var button = document.createElement('button');
				button.id = moderator.userid;
				button.onclick = function() {
					this.disabled = true;
					connection.join(this.id);
					displayNone();
				};
				button.innerHTML = moderator.userid;
				button.setAttribute("id", "btn-public-room");				

				li.appendChild(button);

				if(moderator.userid == connection.sessionid) {
					// if already connected with same moderator
					button.disabled = true;
				}

				publicRoomsDiv.insertBefore(li, publicRoomsDiv.firstChild);
			});
			setTimeout(looper, 5000);
		});
	})();


// 연결이 성공된 후 실행 되는 함수이다.
// 채팅방 입력, 체크박스, 시작버튼, 채팅방 리스트가 사라진다.
function displayNone() {
	document.getElementById("text-roomid").style.display = "none";
	document.getElementById("public_room").style.display = "none";
	document.getElementById("btn-open-or-join-room").style.display = "none";
	document.getElementById("list-room").style.display = "none";
}
