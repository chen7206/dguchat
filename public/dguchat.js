/*
	define functions
*/
// Get index <video> tag.
var videoArea = document.querySelector("#local-video");

// get User Media fucntion on diffrent browsers.
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

// set constraints.
var constraints = {video: true, audio: true};

// start getUderMedia
navigator.getUserMedia(constraints, onSuccess, onError);

	
// success function
function onSuccess(stream) {

	console.log("SUCCESS : getUserMedia.");

	// set video src and play.
	videoArea.src = window.URL.createObjectURL(stream);
	videoArea.play();
}// END - onSuccess function

// error function
function onError(error) {

	console.log("ERROR : getUserMedia : ", error);
}// END - error function
