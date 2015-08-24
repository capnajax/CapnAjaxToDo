function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function login() {
        var nav = Alloy.createWidget("com.capnajax.navigation");
        nav.init({
            drawerContent: null
        });
        var firstController = Alloy.createController("todoList");
        nav.advance(firstController.getView());
        nav.getView().open();
        Alloy.Globals.navigation = nav;
        $.index.close();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "white",
        exitOnClose: "false",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    login ? $.__views.index.addEventListener("open", login) : __defers["$.__views.index!open!login"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.index.addEventListener("open", function() {
        $.index.activity.actionBar.hide();
    });
    $.index.addEventListener("close", function() {
        Titanium.Android.currentActivity.finish();
    });
    $.index.open();
    __defers["$.__views.index!open!login"] && $.__views.index.addEventListener("open", login);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;