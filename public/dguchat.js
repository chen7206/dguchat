/*
	define functions
*/
// Get index <video> tag.
var myVideoArea = document.querySelector("#myVideoTag");
var theirVideoArea = document.querySelector("#theirVideoTag");
var ROOM = "chat";
var SIGNAL_ROOM = "signal_room";
var configuration = {
	'iceServers': [{
		'url': 'stun:stun.l.google.com:19302'
	}]
};
var rtcPeerConn;
			
io = io.connect();
io.emit('ready', {"chat_room": ROOM, "signal_room": SIGNAL_ROOM});
			
//Send a first signaling message to anyone listening
//This normally would be on a button click
io.emit('signal',{"type":"user_here", "message":"Are you ready for a call?", "room":SIGNAL_ROOM});
			
io.on('signaling_message', function(data) {
				
	//Setup the RTC Peer Connection object
	if (!rtcPeerConn)
		startSignaling();
					
	if (data.type != "user_here") {
		var message = JSON.parse(data.message);
		if (message.sdp) {
			rtcPeerConn.setRemoteDescription(new RTCSessionDescription(message.sdp), function () {
				// if we received an offer, we need to answer
				if (rtcPeerConn.remoteDescription.type == 'offer') {
					rtcPeerConn.createAnswer(sendLocalDesc, logError);
				}
			}, logError);
		}
		else {
			rtcPeerConn.addIceCandidate(new RTCIceCandidate(message.candidate));
		}
	}
				
});
			
function startSignaling() {
	
	rtcPeerConn = new webkitRTCPeerConnection(configuration);
				
	// send any ice candidates to the other peer
	rtcPeerConn.onicecandidate = function (evt) {
		if (evt.candidate)
			io.emit('signal',{"type":"ice candidate", "message": JSON.stringify({ 'candidate': evt.candidate }), "room":SIGNAL_ROOM});
	};
				
	// let the 'negotiationneeded' event trigger offer generation
	rtcPeerConn.onnegotiationneeded = function () {
		rtcPeerConn.createOffer(sendLocalDesc, logError);
	}
				
	// once remote stream arrives, show it in the remote video element
	rtcPeerConn.onaddstream = function (evt) {
		theirVideoArea.src = URL.createObjectURL(evt.stream);
	};
				
	// get a local stream, show it in our video tag and add it to be sent
	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
	navigator.getUserMedia({
		'audio': false,
		'video': true
	}, function (stream) {
		myVideoArea.src = URL.createObjectURL(stream);
		rtcPeerConn.addStream(stream);
	}, logError);
			  
}
			
function sendLocalDesc(desc) {
	rtcPeerConn.setLocalDescription(desc, function () {
		io.emit('signal',{"type":"SDP", "message": JSON.stringify({ 'sdp': rtcPeerConn.localDescription }), "room":SIGNAL_ROOM});
	}, logError);
}
			
function logError(error) {
}
			
function displayMessage(message) {
}
			
function displaySignalMessage(message) {
}
