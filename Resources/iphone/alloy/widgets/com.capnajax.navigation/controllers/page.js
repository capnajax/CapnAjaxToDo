function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.capnajax.navigation/" + s : s.substring(0, index) + "/com.capnajax.navigation/" + s.substring(index + 1);
    return path;
}

function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    new (require("alloy/widget"))("com.capnajax.navigation");
    this.__widgetId = "com.capnajax.navigation";
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "page";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.win = Ti.UI.createWindow({
        backButtonTitle: "",
        barColor: "gray",
        extendEdges: [ Ti.UI.EXTEND_EDGE_TOP ],
        tintColor: "#005596",
        navTintColor: "#fff",
        statusBarStyle: Ti.UI.iPhone.StatusBar.LIGHT_CONTENT,
        translucent: false,
        font: {
            fontSize: 12,
            fontFamily: "sans-serif-light"
        },
        id: "win"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.drawerpull = Ti.UI.createButton({
        height: 30,
        width: 30,
        backgroundImage: "/images/ios/com.capnajax.navigation/drawerButton.png",
        id: "drawerpull"
    });
    $.__views.win.leftNavButton = $.__views.drawerpull;
    $.__views.content = Ti.UI.createView({
        id: "content"
    });
    $.__views.win.add($.__views.content);
    if (!Alloy.isTablet) {
        $.__views.drawer = Ti.UI.createView({
            width: 260,
            left: -300,
            visible: false,
            backgroundColor: "black",
            id: "drawer"
        });
        $.__views.win.add($.__views.drawer);
    }
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;