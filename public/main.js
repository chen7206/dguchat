/*!
  간략한 시나리오.
  1. offer가 SDP와 candidate전송
  2. answer는 offer가 보낸 SDP와 cadidate를 Set한다.
  3. answer는 응답할 SDP와 candidate를 얻어서 offer한테 전달한다.
  4. offer는 응답 받은 SDP와 candidate를 Set한다.
*/

$(document).ready(function(){ 

// cross browsing
navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia;
var RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
var RTCSessionDescription = window.RTCSessionDescription || window.mozRTCSessionDescription || window.webkitRTCSessionDescription;
var RTCIceCandidate = window.RTCIceCandidate || window.mozRTCIceCandidate || window.webkitRTCIceCandidate;

// for logic
var socket = io();
var roomId = null;
var userId = Math.round(Math.random() * 9999);
var remoteUserId = null;
var isOffer = null;
var localStream = null;
var peer = null; // offer or answer peer
var iceServers = {
	'iceServers': [
		{'url':'stun:stun.l.google.com:19302'},
		{'url':'stun:stun01.sipphone.com'},
		{'url':'stun:stun.ekiga.net'},
		{'url':'stun:stun.fwdnet.net'},
		{'url':'stun:stun.ideasip.com'},
		{'url':'stun:stun.iptel.org'},
		{'url':'stun:stun.rixtelecom.se'},
		{'url':'stun:stun.schlund.de'},
		{'url':'stun:stun.l.google.com:19302'},
		{'url':'stun:stun1.l.google.com:19302'},
		{'url':'stun:stun2.l.google.com:19302'},
		{'url':'stun:stun3.l.google.com:19302'},
		{'url':'stun:stun4.l.google.com:19302'},
		{'url':'stun:stunserver.org'},
		{'url':'stun:stun.softjoys.com'},
		{'url':'stun:stun.voiparound.com'},
		{'url':'stun:stun.voipbuster.com'},
		{'url':'stun:stun.voipstunt.com'},
		{'url':'stun:stun.voxgratia.org'},
		{'url':'stun:stun.xten.com'},
		{
			'url': 'turn:numb.viagenie.ca',
			'credential': 'muazkh',
			'username': 'webrtc@live.com'
		},
		{
			'url': 'turn:192.158.29.39:3478?transport=udp',
			'credential': 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
			'username': '28224511:1379330808'
		},
		{
			'url': 'turn:192.158.29.39:3478?transport=tcp',
			'credential': 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
			'username': '28224511:1379330808'
		}
	]
  };

var mediaConstraints = {
	'mandatory': {
	'OfferToReceiveAudio': true,
	'OfferToReceiveVideo': true
	}
};


var $body = $('body');
var $roomList = $('#room-list');
var $videoWrap = $('#video-wrap');
var $tokenWrap = $('#token-wrap');
var $uniqueToken = $('#unique-token');
var $joinWrap = $('#join-wrap');


// 메인 함수
function main() {

	// 채팅 방 아이디를 설정한다.
	setRoomId();	

	// 시작 버튼을 누르면 미디어를 가져온다.
	$('#start').click(function() {
		getUserMedia();
	});
}
main();

// 채팅 방 아이디를 설정하는 함수
function setRoomId() {

	// 현재 방 번호
	roomId = location.hash;	

	// 현재 방 번호가 존재 하지 않는다면
	if(roomId.length == 0) {
		
		// 새로운 방 번호를 생성한다.
		roomId = '#' + Math.round(Math.random() * 9999);

		// 생성된 방 번호를 주소 뒤에 붙여준다.
		location.hash = roomId;
	}

	// 현재 주소	
	var src = location.href;

	// 기존의 방 번호 또는 새로 생성한 방 번호를 공유 링크에 나타낸다.
	// text와 href를 바꿔준다.
	$uniqueToken.text(src);
	$uniqueToken.attr('href', src);
}


// 미디어를 가져오는 함수
function getUserMedia() {

	navigator.getUserMedia({audio: true, video: true},
		// 성공 했을 경우 비디오 테그에 자신의 미디어를 나타내준다.
		function(stream) {

			// 전역 변수 미디어 스트림에 자신의 스트림 값을 넣어준다.
			localStream = stream;

			// 비디오를 화면에 출력해준다.
			$videoWrap.append('<video id="local-video" muted="muted" autoplay="true" src="' + URL.createObjectURL(localStream) + '"></video>');
		
			// 방 생성자 이면	
			if (isOffer) {
				// RTCPeerConnection 을 만든다.
				createPeerConnection();
				createOffer();
			}
		},
		// 실패 했을 경우 logError 함수를 호출한다.
		logError);
}

// 오류 출력 함수
function logError(error) {
	console.error(error.name + ' : ' + error.message);
}


// 자신과 상대방을 연결해주는 RTCPeerConnection을 생성하고
// 관련된 이벤트를 정의해준다.
function createPeerConnection() {

	// ice서버 RTCPeerConnection을 생성한다.
	peer = new RTCPeerConnection(iceServers);

	// 시그널링 서버를 통해 ICE서버의 정보를 상대방에게 보내는 이벤트를 정의한다.
	peer.onicecandidate = function(event) {

		if (event.candidate) {
			send({
				userId: userId,
				to: 'all',
				label: event.candidate.sdpMLineIndex,
				id: event.candidate.sdpMid,
				candidate: event.candidate.candidate
			});
		} else {}
	};

	// 상대방과 연결이 된 후 이벤트를 정의한다.
	peer.onaddstream = function(event) {
		
		// 상대방의 미디어를 출력한다.
		$videoWrap.append('<video id="remote-video" autoplay="true" src="' + URL.createObjectURL(event.stream) + '"></video>');
	};

	// 상대방과 연결이 끊기면 실행되는 이벤트를 정의한다.
	peer.onremovestream = function(event) {};
}


// 1. offer가 데이터를 전송하는 함수
function createOffer() {

	// 피어에 자신의 미디어 스트림을 추가한다.
	peer.addStream(localStream);

	// SDP
	peer.createOffer(function(SDP) {
		
		peer.setLocalDescription(SDP);
		console.log("Sending offer description", SDP);
	
		send({
			sender: userId,
			to: 'all',
			sdp: SDP
		});
	}, onSdpError, mediaConstraints);
}


  /**
  * createAnswer
  * offer에 대한 응답 SDP를 생성 한다.
  * @param {object} msg offer가 보내온 signaling
  */

// 2. 
function createAnswer(msg) {
	console.log('createAnswer', arguments);

	peer.addStream(localStream);
	peer.setRemoteDescription(new RTCSessionDescription(msg.sdp), function() {
		peer.createAnswer(function(SDP) {
			peer.setLocalDescription(SDP);
			console.log("Sending answer to peer.", SDP);

			send({
				sender: userId,
				to: 'all',
				sdp: SDP
			});
		}, onSdpError, mediaConstraints);
	}, function() {
		console.error('setRemoteDescription', arguments);
	});
}


  /**
  * onSdpError
  */
  function onSdpError() {
    console.log('onSdpError', arguments);
  }













  /****************************** Below for signaling ************************/

  /**
  * send
  * @param {object} msg data
  */
  function send(data) {
    console.log('send', data);

    data.roomId = roomId;
    socket.send(data);
  }

  /**
  * onmessage
  * @param {object} msg data
  */
  function onmessage(data) {
    console.log('onmessage', data);

    var msg = data;
    var sdp = msg.sdp || null;

    if (!remoteUserId) {
      remoteUserId = data.userId;
    }

    // 접속자가 보내온 offer처리
    if (sdp) {
      if (sdp.type  == 'offer') {
        createPeerConnection();
        console.log('Adding local stream...');
        createAnswer(msg);

      // offer에 대한 응답 처리
      } else if (sdp.type == 'answer') {
        // answer signaling
        peer.setRemoteDescription(new RTCSessionDescription(msg.sdp));
      }

    // offer, answer cadidate처리
    } else if (msg.candidate) {
      var candidate = new RTCIceCandidate({
        sdpMLineIndex: msg.label,
        candidate: msg.candidate
      });

      peer.addIceCandidate(candidate);
    } else {
      //console.log()
    }
  }


  /**
   * onFoundUser
   */
  function onFoundUser() {
    $roomList.html([
      '<div class="room-info">',
        '<p>당신을 기다리고 있어요. 참여 하실래요?</p>',
        '<button id="join">Join</button>',
      '</div>'].join('\n'));

    var $btnJoin = $('#join');
    $btnJoin.click(function() {
      isOffer = true;
      getUserMedia();
      $(this).attr('disabled', true);
    });

    $joinWrap.slideUp(1000);
    $tokenWrap.slideUp(1000);
  }

  /**
   * onLeave
   * @param {string} userId
   */
  function onLeave(userId) {
    if (remoteUserId == userId) {
      $('#remote-video').remove();
      $body.removeClass('connected').addClass('wait');
      remoteUserId = null;
    }
  }


  /**
   * socket handling
   */
  socket.emit('joinRoom', roomId, userId);
  socket.on('joinRoom', function(roomId, userList) {
    console.log('joinRoom', arguments);
    if (Object.size(userList) > 1) {
      onFoundUser();
    }
  });

  socket.on('leaveRoom', function(userId) {
    console.log('leaveRoom', arguments);
    onLeave(userId);
  });

  socket.on('message', function(data) {
    onmessage(data);
  });
});// END - $

Object.size = function(obj) {
  var size = 0, key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      size++;
    }
  }
  return size;
};
