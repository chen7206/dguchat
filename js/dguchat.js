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

document.getElementById('btn-open-or-join-room').onclick = function() {
	this.disabled = true;
	connection.openOrJoin(roomid.value || 'predefined-roomid');
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
                        li.innerHTML = '<b>' + moderator.userid + '</b>&nbsp;&nbsp;';
                        var button = document.createElement('button');
                        button.id = moderator.userid;
                        button.onclick = function() {
                            this.disabled = true;
                            connection.join(this.id);
                        };
                        button.innerHTML = 'Join this room';
                        li.appendChild(button);
                        if(moderator.userid == connection.sessionid) {
                            // if already connected with same moderator
                            button.disabled = true;
                        }
                        publicRoomsDiv.insertBefore(li, publicRoomsDiv.firstChild);
                    });
                    setTimeout(looper, 3000);
                });
            })();
