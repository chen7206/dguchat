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
	}

	if(event.type == 'remote') {
		remoteVideoContainer.appendChild(video);
	}
};

var roomid = document.getElementById('text-roomid');
//roomid.value = connection.token();
roomid.value = Math.round(Math.random() * 100);

document.getElementById('btn-open-or-join-room').onclick = function() {
	this.disabled = true;
	connection.openOrJoin(roomid.value || 'predefined-roomid');
};
