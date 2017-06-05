#dguchat  
Dongguk University WebRTC Chat Service  
  
#Custom Signaling Server in heroku with RTCConnection  
https://dguchat.herokuapp.com/  
  
#RTCMultiConnection framwork in DGU chat signaling Server(heroku)  
https://dguchat.herokuapp.com/views/RTCMultiConnection.js  
https://dguchat.herokuapp.com/views/RTCMultiConnection.min.js  
  
#Socket.io URL in DGU chat signaling Server(heroku)  
connection.socketURL = 'https://dguchat.herokuapp.com:443/';  
  
#ICE Server?  
this signaling server based on RTCConnection.  
defulat ICE Framwork in RTCConnection :  
STUN server - google.com  
TURN server - webrtcweb.com  
(we can add custom ICE servers. check : http://www.rtcmulticonnection.org/docs/iceServers/)  
