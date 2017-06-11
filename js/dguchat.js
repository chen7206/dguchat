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

	video = event.mediaElement;
	video.autoplay = true;
	//console.log(video);

	if(event.type === 'local') {
		localVideoContainer.appendChild(video);
	}
	if(event.type === 'remote') {
		remoteVideoContainer.appendChild(video);
	}
};



var roomid = document.getElementById('text-roomid');


document.getElementById('btn-open-or-join-room').onclick = function() {
	this.disabled = true;

	connection.openOrJoin(roomid.value);
	
	displayNone();

};

// 연결이 성공된 후 실행 되는 함수이다.
// 채팅방 입력, 체크박스, 시작버튼, 채팅방 리스트가 사라진다.
function displayNone() {
	document.getElementById("text-roomid").style.display = "none";
	document.getElementById("btn-open-or-join-room").style.display = "none";
}
