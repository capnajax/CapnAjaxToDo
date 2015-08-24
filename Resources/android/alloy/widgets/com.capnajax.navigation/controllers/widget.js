function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.capnajax.navigation/" + s : s.substring(0, index) + "/com.capnajax.navigation/" + s.substring(index + 1);
    return true && 0 !== path.indexOf("/") ? "/" + path : path;
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
    function __alloyId1() {
        $.__views.widget.removeEventListener("open", __alloyId1);
        if ($.__views.widget.activity) $.__views.widget.activity.onCreateOptionsMenu = function(e) {
            var __alloyId0 = {
                showAsAction: Ti.Android.SHOW_AS_ACTION_ALWAYS,
                icon: Ti.Android.R.drawable.ic_menu_preferences,
                id: "item1",
                title: "Menu"
            };
            $.__views.item1 = e.menu.add(_.pick(__alloyId0, Alloy.Android.menuItemCreateArgs));
            $.__views.item1.applyProperties(_.omit(__alloyId0, Alloy.Android.menuItemCreateArgs));
            $.item1 = $.__views.item1;
        }; else {
            Ti.API.warn("You attempted to attach an Android Menu to a lightweight Window");
            Ti.API.warn("or other UI component which does not have an Android activity.");
            Ti.API.warn("Android Menus can only be opened on TabGroups and heavyweight Windows.");
        }
    }
    function toggleDrawer() {
        drawerOpen ? closeDrawer() : openDrawer();
    }
    new (require("alloy/widget"))("com.capnajax.navigation");
    this.__widgetId = "com.capnajax.navigation";
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "widget";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.widget = Ti.UI.createWindow({
        navBarHidden: false,
        exitOnClose: "false",
        id: "widget"
    });
    $.__views.widget && $.addTopLevelView($.__views.widget);
    $.__views.widget.addEventListener("open", __alloyId1);
    var __alloyId2 = [];
    $.__views.navigation = Ti.UI.createScrollableView({
        scrollingEnabled: false,
        views: __alloyId2,
        id: "navigation"
    });
    $.__views.widget.add($.__views.navigation);
    $.__views.drawer = Ti.UI.createView({
        width: 260,
        left: -260,
        visible: false,
        backgroundColor: "black",
        id: "drawer"
    });
    $.__views.widget.add($.__views.drawer);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var drawerOpen = false;
    var duration = 400;
    var init = function(opts) {
        if (opts.drawerContent) {
            drawerContent = opts.drawerContent;
            drawer.add(opts.drawerContent);
        }
    };
    var drawer, drawerContent;
    var detail = $.widget;
    drawer = $.drawer;
    var updateActionBar = function() {
        setTimeout(function() {
            var actionBar = detail.activity.actionBar;
            if (actionBar && $.navigation.views && $.navigation.views.length > 0) {
                _.last($.navigation.views);
                actionBar.title = _.last($.navigation.views).title;
                if (1 == $.navigation.views.length) {
                    actionBar.icon = "/drawable-xxhdpi/com.capnajax.navigation/ic_action_overflow.png";
                    actionBar.onHomeIconItemSelected = toggleDrawer;
                } else {
                    actionBar.icon = "/drawable-xxhdpi/com.capnajax.navigation/ic_action_back.png";
                    actionBar.onHomeIconItemSelected = function() {
                        setTimeout(retreat, 0);
                    };
                }
            }
        }, 10);
    };
    var advance = function(view) {
        drawer && closeDrawer(true);
        advanceImpl(view, false);
    };
    var advanceImpl;
    var advanceImpl = function(view, first) {
        detail.addEventListener("swipe", function(e) {
            "right" !== e.direction || drawerOpen || openDrawer();
            "left" === e.direction && drawerOpen && closeDrawer();
        });
        if (first) {
            $.navigation.views = [ view ].concat($.navigation.views);
            $.navigation.currentPage = 0;
        } else {
            $.navigation.addView(view);
            $.navigation.scrollToView(view);
        }
        detail.title = _.last(detail.children).title;
        1 == $.navigation.views.length ? $.widget.addEventListener("open", updateActionBar) : updateActionBar();
    };
    var retreat = function(index) {
        var viewsArray = $.navigation.views;
        var steps = 0;
        if (void 0 === index) steps = 1; else if ("object" == typeof index) {
            for (i = viewsArray.length - 1; i >= 0; i--) if (index === viewsArray[i]) {
                steps = viewsArray.length - i - 1;
                break;
            }
        } else 0 > index ? steps = -index : index > 0 && (steps = viewsArray.length - index);
        if (0 >= steps) return;
        steps >= viewsArray.length && (steps = viewsArray.length - 1);
        drawer && closeDrawer(true);
        $.navigation.scrollToView(_.first(_.last($.navigation.views, steps + 1)));
        setTimeout(function() {
            for (var i = 0; steps > i; i++) $.navigation.removeView(_.last($.navigation.views));
        }, 0);
        updateActionBar();
    };
    var home = function(newHome) {
        if (newHome) {
            closeDrawer();
            advanceImpl(newHome, true);
            $.navigation.views = [ newHome ];
        } else home($.navigation.views[0]);
    };
    var openDrawer = function() {
        var animationDuration = duration * -drawer.rect.x / drawer.rect.width;
        drawer.visible = true;
        drawerOpen = true;
        drawerContent && drawerContent.fireEvent("draweropen");
        drawer.animate({
            left: 0,
            duration: animationDuration
        });
    };
    var closeDrawer = function(now) {
        if (drawer && drawerContent && true) if (now) {
            drawer.left = -drawer.rect.width;
            drawer.visible = false;
            drawerOpen = false;
            drawerContent.fireEvent("drawerclosed", {
                immediate: true
            });
        } else drawer.animate({
            left: -drawer.rect.width,
            duration: duration
        }, function() {
            drawer.visible = false;
            drawerOpen = false;
            drawerContent.fireEvent("drawerclosed", {
                immediate: false
            });
        }); else drawerOpen = false;
    };
    var back = function(e) {
        if ($.navigation.views.length > 1) {
            retreat();
            e.cancelBubble = true;
        } else detail.close();
    };
    detail.addEventListener("androidback", back);
    _.extend($, {
        init: init,
        advance: advance,
        retreat: retreat,
        home: home
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;