var firstName = document.querySelector("#firstName");
var secondName = document.querySelector("#secondName");
var secondFirst = document.querySelector("#secondFirst");
var enterAsFirst = document.querySelector("#enterAsFirst");
var requestSecond = document.querySelector("#requestSecond");
var secondSignupButton = document.querySelector("#secondSignupButton");
var callSecond = document.querySelector("#callSecond");
var enterAsSecond = document.querySelector("#enterAsSecond");

enterAsFirst.addEventListener('click', function(ev){
	
	myUserType = "first";
	ev.preventDefault();
}, false);


requestSecond.addEventListener('click', function(ev){
	
	firstUserName = firstName.value || 'no name';
	myName = firstUserName;
	io.emit('signal', {"user_type": "first", "user_name": firstUserName, "user_data": "no data, just a first", "command": "joinroom"});
	console.log("first " + firstUserName + " has joined.");
	
	ev.preventDefault();
}, false);


enterAsSecond.addEventListener('click', function(ev){
	
	myUserType = "second";
	ev.preventDefault();
}, false);

//Allows the second to "sign up" by entering their name and speciality
secondSignupButton.addEventListener('click', function(ev){
	
	//The second joins the signaling room in socket.io
	secondUserName = secondName.value || 'no name';
	myName = secondUserName;
	io.emit('signal', {"user_type": "second", "user_name": secondUserName, "user_data": secondFirst.value, "command": "joinroom"});
	console.log("Dr. " + secondUserName + " has joined.");
	
	ev.preventDefault();
}, false);

//Once a second has arrived on the second listing view,
//a first calls them from this button
callSecond.addEventListener('click', function(ev){
	
	//Send a signal that the first is calling
	firstUserName = firstName.value || 'no name';
	io.emit('signal', {"user_type": "first", "user_name": firstUserName, "user_data": "calling second", "command": "callsecond"});
	console.log("first " + firstUserName + " is calling.");
	
	//Kick off the WebRTC signaling
	//Setup the RTC Peer Connection object
	if (!rtcPeerConn) startSignaling();
	
	ev.preventDefault();
}, false);

