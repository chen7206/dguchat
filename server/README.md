# RTCMultiConnection 시그널링 서버
muaz-khan의 RTCMultiConnection 시그널링 서버를 커스텀마이징 한 서버 소스들입니다.  

muaz-khan의 RTCMultiConnection은 https://github.com/muaz-khan/RTCMultiConnection 에서 확인할 수 있습니다.  

원본 소스에서 데모 페이지, 각종 문서들을 제거했습니다.  

views 폴더에 index.html 파일을 만들어 놨습니다. 거기다가 직접 WebRTC 웹 어플리케이션을 작성해도됩니다.  

dguchat에서는 시그널링 서버에 웹 어플리케이션을 구현하지 않았고, 단순히 시그널링 처리만 하는 용도로 사용하고 있습니다.  

Front-End 부분은 https://github.com/rudebono/dguchat/tree/gh-pages 에서 확인할 수 있습니다.  

# 서버 설치 방법  
위 서버는 node.js 를 기초로 하여 만들어진 시그널링 서버입니다.  

Node.js에 대한 정보와 설치 방법은 https://nodejs.org/ko/ 에서 확인할 수 있습니다.  

npm을 이용하여 서버에 필요한 모듈들을 관리 합니다.  

npm에 대한 정보와 설치 방법은 https://www.npmjs.com/ 에서 확인 할 수 있습니다.  

webRTC를 이용하기 위해서 HTTPS 프로토콜을 지원하는 서버가 필요합니다.  

호스팅이나 여러 클라우드 상품들이 있지만, 저는 heroku 클라우드를 사용하였습니다.  

https://www.heroku.com/ 에서 자세한 내용을 볼 수 있습니다.  

깃을 이용하여 현재 프로젝트를 clone 합니다.  

	git clone https://github.com/rudebono/dguchat.git
  
서버 폴더로 이동합니다.  

	cd ./dguchat/server
  
RTCMultiConnection 폴더가 보입니다. 이 부분이 시그널링 서버의 소스코드 입니다. 이 폴더로 이동합니다.  

	cd ./RTCMultiConnection
  
npm을 이용하여 모듈들을 설치합니다. 해당 서버에 필요한 다양한 모듈들은 package.json에 기재가 되어있고,  

npm 을 이용하여 한번에 모듈들을 설치할 수 있습니다.  

	npm install
  
모듈들이 설치가 완료 되면, node.js를 이용해서 서버를 실행합니다.  

  	node ./server.js
  
시그널링 서버가 완성이되었습니다.  

# 실제 적용 방법

실제로 서비스를 하려면 HTTPS 프로토콜이 지원해야 하므로  

Node.js - PaaS를 지원하는 클라우드 서비스를 이용하시는 걸 추천합니다.  

호스팅 같은경우 HTTPS 프로토콜을 지원해주지 않는 곳이 있고, 또 사용하려면 가격이 추가 되기때문에 추천하고 싶지 않습니다.  

대부분 PaaS (Google App Engine, Heroku 등)는 기본 도메인에 HTTPS를 지원합니다.  

본인이 원하는 PaaS에 서버 이미지 파일을 업로드하고 실행만 시키면 됩니다.  

# 기타 문의
저는 Javascript 프로그래머가 아니라서 정확히 기술쪽으로 도움을 줄 수 없지만,  

프로젝트를 진행하면서 여러 PaaS에서 서버 이미지를 업로드하여 실행한 적이 많습니다.  

서버를 적용하는데 문제가 발생한다면 깃허브 이슈나, 메일 보내주시면 감사하겠습니다.
