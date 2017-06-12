#소스 분석


**import QtQuick 2.0**

QML 코드를 사용하기 위한 standard 라이브러리
Qt Quick 모듈은 user interface를 QML을 이용하여 만들 수 있도록 한다.
QML API 뿐만 아니라 C++ API 까지 제공하여 QML을 C++코드로 확장할 수 있다.
 
**import QtQuick.Window 2.0**

Qt Quick 내에 있는 라이브러리이다.
window 모듈을 이용하기 위해 import하였다.

**import QtWebEngine 1.1**



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

