# 소스 분석


    import QtQuick 2.0

QML 코드를 사용하기 위한 standard 라이브러리
Qt Quick 모듈은 user interface를 QML을 이용하여 만들 수 있도록 한다.
QML API 뿐만 아니라 C++ API 까지 제공하여 QML을 C++코드로 확장할 수 있다.
 
    import QtQuick.Window 2.0

Qt Quick 내에 있는 라이브러리이다.
window 모듈을 이용하기 위해 import하였다.

    import QtWebEngine 1.1

QtWebEngine 은 동적인 웹 컨텐츠들을 렌더링하는 기능을 제공하는 모듈이다.
이 소스 코드에서는 WebEngineView를 구현하기 위해 import하였다.


    Window {
           title: "Dongguk University Chat with WebRTC"
           width: 600
           height: 800
           visible: true
           WebEngineView {
           anchors.fill: parent
           url: "https://rudebono.github.io/dguchat"
           onFeaturePermissionRequested: {
                grantFeaturePermission(securityOrigin, feature, true);
            }
        }
    }

**window**는 top-level window를 생성하는 메소드이다.
top-levle window는 window manager와 독립된 window이다.
그래서 사이즈와 같은 것들을 임의로 설정해 줄 수 있다.

코드를 보면 **width, height** 변수로 크기를 설정해주었다.
**url**를 통해서 window에 띄울 웹페이지 주소를 설정해 주었다.

**onFeaturePermissionRequested:** 는 QtWebEngine내의 메소드로서
web에서 카메라 기능을 구현할 수 있도록 한다.
