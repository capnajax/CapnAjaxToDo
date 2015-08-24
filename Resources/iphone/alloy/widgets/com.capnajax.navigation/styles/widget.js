function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.capnajax.navigation/" + s : s.substring(0, index) + "/com.capnajax.navigation/" + s.substring(index + 1);
    return path;
}

module.exports = [ {
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
} ];