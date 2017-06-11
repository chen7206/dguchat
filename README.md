# RTCMultiConnection API를 이용한 웹 어플리케이션
muaz-khan의 RTCMultiConnection 시그널링 서버를 기반으로 제작된 API를 사용하여 제작한 웹 어플리케이션 입니다.

dguchat에서는 시그널링 서버에 웹 어플리케이션을 구현하지 않았고, 단순히 시그널링 처리만 하는 용도로 사용하고 있습니다.  

Back-End 부분은 https://github.com/rudebono/dguchat/tree/master/server 에서 확인할 수 있습니다.  

dguchat의 시그널링 서버의 주소는 http://dguchat.herokuapp.com/ 입니다.  

만약 서버에 대한 지식이 전무 하다면 앞으로 설명하는 글을 잘 읽어주세요.  

시그널링 서버를 구축하지 않고 웹 어플리케이션을 개발 할 수 있습니다.  

개발자 muaz-khan은 소스 코드 공개 뿐만아니라 시그널링 서버를 구축해서 무료로 공개하고 있습니다.  

저희도 muaz-khan의 소스를 커스텀마이징해서 시그널링 서버를 구축하였고, 무료로 공개하고 있습니다.  

시그널링 서버 구축이 어렵다면 위 둘중 하나의 서버를 선택해서 웹 어플리케이션을 개발 할 수 있습니다.

# 개발 방법
개발자 muaz-khan은 처음 시작하는 뉴비들을 위해 유튜브에 어떻게 RTCMultiConnection API를 사용하는지 방법을 올려놨습니다.  

https://www.youtube.com/watch?v=jqtC7mSTCgk

프로젝트를 진행하면서 많은 자료들을 참고 하였지만 이 보다 좋은 자료는 못봤습니다.  

개발자가 직접 코드를 입력해서 간단한 화상 채팅 프로그램을 작성하는 법을 알려주는 동영상입니다.  

동영상에서는 muaz-khan이 무료로 공개한 시그널링 서버를 사용합니다.  

만약 dguchat의 무료 시그널링 서버를 이용하고 싶으신 분은

	var connection = new RTCMultiConnection();
	connection.socketURL = 'https://dguchat.herokuapp.com:443/';

소켓 주소에 https://dguchat.herokuapp.com:443/ 를 입력하여 사용하면 됩니다.


# RTCMultiConnection API 명세서
동영상을 보신분은 간단하게 WebRTC 어플리케아션을 만들 수 있다고 깨달았을 겁니다.  

자세한 API 설명은 http://www.rtcmulticonnection.org/ 에서 확인 할 수 있습니다.
