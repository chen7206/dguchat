io = io.connect();
var myName = "";
var theirName = "";
var myUserType = "";
var configuration = {
	'iceServers': [{
		'url': 'stun:stun1.l.google.com:19302'
	}]
};
var rtcPeerConn;
var mainVideoArea = document.querySelector("#mainVideoTag");
var smallVideoArea = document.querySelector("#smallVideoTag");

io.on('signal', function(data) {
	if (data.user_type == "second" && data.command == "joinroom") {
		console.log("The second is here!");
		if (myUserType == "first") {
			theirName = data.user_name;
		}
	}
	else if (data.user_type == "first" && data.command == "callsecond") {
		console.log("First is calling");
		if (myUserType == "second") {
			theirName = data.user_name;
		}
	}
	else if (data.user_type == 'signaling') {
		if (!rtcPeerConn) startSignaling();
		var message = JSON.parse(data.user_data);
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
	console.log("starting signaling...");
	rtcPeerConn = new RTCPeerConnection(configuration);
	
	// send any ice candidates to the other peer
	rtcPeerConn.onicecandidate = function (evt) {
		if (evt.candidate)
			io.emit('signal',{"user_type":"signaling", "command":"icecandidate", "user_data": JSON.stringify({ 'candidate': evt.candidate })});
		console.log("completed sending an ice candidate...");
	};
	
	// let the 'negotiationneeded' event trigger offer generation
	rtcPeerConn.onnegotiationneeded = function () {
		console.log("on negotiation called");
		rtcPeerConn.createOffer(sendLocalDesc, logError);
	};
	
	// once remote stream arrives, show it in the main video element
	rtcPeerConn.onaddstream = function (evt) {
		console.log("going to add their stream...");
		mainVideoArea.src = URL.createObjectURL(evt.stream);
	};

	navigator.getUserMedia({ "audio": true, "video": true }, function (stream) {
		smallVideoArea.src = URL.createObjectURL(stream);
		rtcPeerConn.addStream(stream);

		if (myUserType == "first")
			rtcPeerConn.createOffer(sendLocalDesc);
		else
			rtcPeerConn.createAnswer(sendLocalDesc);
	}, logError);
			  
}

function sendLocalDesc(desc) {
	rtcPeerConn.setLocalDescription(desc, function () {
		console.log("sending local description");
		io.emit('signal',{"user_type":"signaling", "command":"SDP", "user_data": JSON.stringify({ 'sdp': rtcPeerConn.localDescription })});
	}, logError);
}
			
function logError(error) {
}

