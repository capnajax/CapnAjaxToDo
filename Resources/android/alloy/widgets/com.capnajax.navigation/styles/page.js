function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.capnajax.navigation/" + s : s.substring(0, index) + "/com.capnajax.navigation/" + s.substring(index + 1);
    return true && 0 !== path.indexOf("/") ? "/" + path : path;
}

module.exports = [ {
    isId: true,
    priority: 100000.0003,
    key: "leftNavButton",
    style: {}
}, {
    isId: true,
    priority: 100000.0004,
    key: "drawerpull",
    style: {}
}, {
    isId: true,
    priority: 100000.0005,
    key: "content",
    style: {}
}, {
    isId: true,
    priority: 100000.0006,
    key: "drawer",
    style: {
        width: 260,
        left: -300,
        visible: false,
        backgroundColor: "black"
    }
}, {
    isId: true,
    priority: 100000.0007,
    key: "win",
    style: {
        backButtonTitle: "",
        barColor: "#005596",
        extendEdges: [ Ti.UI.EXTEND_EDGE_TOP ],
        tintColor: "#005596",
        navTintColor: "#fff",
        statusBarStyle: Ti.UI.iPhone.StatusBar.LIGHT_CONTENT,
        translucent: false,
        font: {
            fontSize: 12,
            fontFamily: "sans-serif-light"
        }
    }
} ];