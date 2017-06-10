import QtQuick 2.0
import QtQuick.Window 2.0
import QtWebEngine 1.1

Window {
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
