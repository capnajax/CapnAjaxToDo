function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.capnajax.navigation/" + s : s.substring(0, index) + "/com.capnajax.navigation/" + s.substring(index + 1);
    return true && 0 !== path.indexOf("/") ? "/" + path : path;
}

module.exports = [ {
    isApi: true,
    priority: 1101.0013,
    key: "MenuItem",
    style: {
        showAsAction: Ti.Android.SHOW_AS_ACTION_ALWAYS
    }
}, {
    isId: true,
    priority: 100000.001,
    key: "detailWindow",
    style: {
        width: Ti.UI.FILL
    }
}, {
    isId: true,
    priority: 100000.0011,
    key: "first",
    style: {}
}, {
    isId: true,
    priority: 100000.0012,
    key: "menu",
    style: {}
}, {
    isId: true,
    priority: 100101.0008,
    key: "widget",
    style: {
        navBarHidden: false,
        exitOnClose: true
    }
}, {
    isId: true,
    priority: 100101.0009,
    key: "drawer",
    style: {
        width: 260,
        left: -260,
        visible: false,
        backgroundColor: "black"
    }
}, {
    isId: true,
    priority: 100101.0014,
    key: "item1",
    style: {
        icon: Ti.Android.R.drawable.ic_menu_preferences
    }
}, {
    isId: true,
    priority: 100101.0015,
    key: "navigation",
    style: {
        scrollingEnabled: false
    }
} ];