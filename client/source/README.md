#�ҽ� �м�


**import QtQuick 2.0**

QML �ڵ带 ����ϱ� ���� standard ���̺귯��
Qt Quick ����� user interface�� QML�� �̿��Ͽ� ���� �� �ֵ��� �Ѵ�.
QML API �Ӹ� �ƴ϶� C++ API ���� �����Ͽ� QML�� C++�ڵ�� Ȯ���� �� �ִ�.
 
**import QtQuick.Window 2.0**

Qt Quick ���� �ִ� ���̺귯���̴�.
window ����� �̿��ϱ� ���� import�Ͽ���.

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

