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
    function toggleDrawer() {
        drawerOpen ? closeDrawer() : openDrawer();
    }
    var Widget = new (require("alloy/widget"))("com.capnajax.navigation");
    this.__widgetId = "com.capnajax.navigation";
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "widget";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        var __parentSymbol = __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    if (true && Alloy.isTablet) {
        $.__views.drawer = Ti.UI.createWindow({
            id: "drawer"
        });
        $.__views.first = Alloy.createWidget("com.capnajax.navigation", "page", {
            id: "first",
            __parentSymbol: __parentSymbol
        });
        $.__views.detailWindow = Ti.UI.iOS.createNavigationWindow({
            width: Ti.UI.FILL,
            window: $.__views.first.getViewEx({
                recurse: true
            }),
            id: "detailWindow"
        });
        $.__views.widget = Ti.UI.iPad.createSplitWindow({
            masterView: $.__views.drawer,
            detailView: $.__views.detailWindow,
            id: "widget"
        });
        $.__views.widget && $.addTopLevelView($.__views.widget);
    }
    if (true && !Alloy.isTablet) {
        $.__views.first = Alloy.createWidget("com.capnajax.navigation", "page", {
            id: "first",
            __parentSymbol: __parentSymbol
        });
        $.__views.widget = Ti.UI.iOS.createNavigationWindow({
            window: $.__views.first.getViewEx({
                recurse: true
            }),
            id: "widget"
        });
        $.__views.widget && $.addTopLevelView($.__views.widget);
    }
    exports.destroy = function() {};
    _.extend($, $.__views);
    var drawerOpen = false;
    var duration = 400;
    var init = function(opts) {
        if (opts.drawerContent) {
            drawerContent = opts.drawerContent;
            (false || Alloy.isTablet) && drawer.add(opts.drawerContent);
        }
    };
    var drawer, drawerContent;
    var detail = true && Alloy.isTablet ? $.detailWindow : $.widget;
    drawerContent = null;
    Alloy.isHandheld ? $.first.drawerpull.addEventListener("click", toggleDrawer) : $.widget.addEventListener("visible", function(e) {
        "detail" === e.view && ($.first.getView("win").leftNavButton = e.button);
    });
    (false || Alloy.isTablet) && (drawer = $.drawer);
    var widgetViews = [];
    var removeWidgetView = function(e) {
        for (var i = widgetViews.length - 1; i >= 0; i--) if (widgetViews[i].window === e.source) {
            widgetViews.splice(i, 1);
            break;
        }
        Alloy.isHandheld && resetDrawer();
    };
    var resetDrawer = Alloy.isHandheld && _.debounce(function() {
        var newCurrentWidget = widgetViews && widgetViews.length > 0 && _.last(widgetViews).widget;
        if (newCurrentWidget) {
            drawer = newCurrentWidget.getView("drawer");
            drawerContent && setTimeout(function() {
                drawer.add(drawerContent);
            }, 0);
        } else drawer = null;
    }, 20, true);
    var advance = function(view) {
        drawer && closeDrawer(true);
        advanceImpl(view, false);
    };
    var advanceImpl;
    var advanceImpl = function(view) {
        setTimeout(function() {
            var pageWidget, win;
            if (0 === widgetViews.length) {
                pageWidget = $.first;
                win = $.first.getView();
            } else {
                pageWidget = Widget.createWidget("com.capnajax.navigation", "page");
                win = pageWidget.getView();
            }
            widgetViews.push({
                window: win,
                widget: pageWidget,
                content: view
            });
            win.addEventListener("close", function() {
                closeDrawer(true);
            });
            win.addEventListener("close", removeWidgetView);
            win.addEventListener("close", function(evt) {
                view.fireEvent("close", _.extend(evt, {
                    source: view
                }));
            });
            pageWidget.content.add(view);
            win.title = view.title;
            Alloy.isHandheld && win.addEventListener("swipe", function(e) {
                "right" !== e.direction || drawerOpen || openDrawer();
                "left" === e.direction && drawerOpen && closeDrawer();
            });
            if (Alloy.isHandheld) {
                drawer = pageWidget.getView("drawer");
                drawerContent && drawer.add(drawerContent);
            }
            widgetViews.length > 1 && (win.leftNavButton = void 0);
            widgetViews.length > 1 && detail.openWindow(win, {
                animated: true
            });
        }, 0);
    };
    var retreat = function(index) {
        var viewsArray = widgetViews;
        var steps = 0;
        if (void 0 === index) steps = 1; else if ("object" == typeof index) {
            for (i = viewsArray.length - 1; i >= 0; i--) if (index === viewsArray[i].content) {
                steps = viewsArray.length - i - 1;
                break;
            }
        } else 0 > index ? steps = -index : index > 0 && (steps = viewsArray.length - index);
        if (0 >= steps) return;
        steps >= viewsArray.length && (steps = viewsArray.length - 1);
        drawer && closeDrawer(true);
        Alloy.isHandheld && _.last(widgetViews).widget.getView("drawer").removeAllChildren();
        windowsToClose = _.last(widgetViews, steps);
        _.each(windowsToClose, function(element) {
            setTimeout(function() {
                detail.closeWindow(element.window);
            }, 0);
        });
    };
    var home = function(newHome) {
        if (newHome) {
            closeDrawer();
            for (var i = 1; i < widgetViews.length; i++) detail.closeWindow(widgetViews[i].window);
            var oldContent = widgetViews[0].content;
            widgetViews = [];
            advance(newHome);
            $.first.content.remove(oldContent);
        } else retreat(1);
    };
    var openDrawer = function() {
        if (false || Alloy.isHandheld) {
            var animationDuration = duration * -drawer.rect.x / drawer.rect.width;
            drawer.visible = true;
            drawerOpen = true;
            drawerContent && drawerContent.fireEvent("draweropen");
            drawer.animate({
                left: 0,
                duration: animationDuration
            });
        } else drawerOpen = true;
    };
    var closeDrawer = function(now) {
        if (drawer && drawerContent && (false || Alloy.isHandheld)) if (now) {
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
    if (true && Alloy.isTablet) {
        var orientationEvent = function() {
            Ti.Gesture.isLandscape() && false == drawerOpen && drawerContent.fireEvent("draweropen");
            Ti.Gesture.isPortrait() && false == drawerOpen && drawerContent.fireEvent("drawerclosed", {
                immediate: true
            });
        };
        Ti.Gesture.addEventListener("orientationchange", orientationEvent);
        $.widget.addEventListener("close", function() {
            Ti.Gesture.removeEventListener("orientationchange", orientationEvent);
        });
    }
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