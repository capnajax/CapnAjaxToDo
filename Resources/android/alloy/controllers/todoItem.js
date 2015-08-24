function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function updateUi(e) {
        if (e && e.fromAdapter) return;
        updateUi.opts || {};
        var models = instanceViewFilter(__alloyId31);
        var len = models.length;
        var children = $.__views.todoItem.children;
        for (var d = children.length - 1; d >= 0; d--) $.__views.todoItem.remove(children[d]);
        for (var i = 0; len > i; i++) {
            var __alloyId5 = models[i];
            __alloyId5.__transform = doTransform(__alloyId5);
            var __alloyId7 = Ti.UI.createView({
                height: Ti.UI.SIZE,
                layout: "vertical"
            });
            $.__views.todoItem.add(__alloyId7);
            var __alloyId8 = Ti.UI.createView({
                top: 0,
                left: 10,
                right: 10,
                height: 50,
                layout: "horizontal"
            });
            __alloyId7.add(__alloyId8);
            var __alloyId10 = Ti.UI.createView({
                width: 40,
                bindId: "status"
            });
            __alloyId8.add(__alloyId10);
            toggleStatus ? __alloyId10.addEventListener("click", toggleStatus) : __defers["__alloyId10!click!toggleStatus"] = true;
            var __alloyId12 = Ti.UI.createImageView({
                width: 24,
                height: 24,
                image: "/checkbox_checked.png",
                opacity: "undefined" != typeof __alloyId5.__transform["completedOpacity"] ? __alloyId5.__transform["completedOpacity"] : __alloyId5.get("completedOpacity")
            });
            __alloyId10.add(__alloyId12);
            var __alloyId14 = Ti.UI.createImageView({
                width: 24,
                height: 24,
                image: "/checkbox_unchecked.png",
                opacity: "undefined" != typeof __alloyId5.__transform["pendingOpacity"] ? __alloyId5.__transform["pendingOpacity"] : __alloyId5.get("pendingOpacity")
            });
            __alloyId10.add(__alloyId14);
            var __alloyId16 = Ti.UI.createLabel({
                textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
                width: Titanium.UI.SIZE,
                font: {
                    fontSize: 24,
                    fontFamily: "Helvetica,sans-serif"
                },
                color: "#193380",
                textid: "undefined" != typeof __alloyId5.__transform["statusLabel"] ? __alloyId5.__transform["statusLabel"] : __alloyId5.get("statusLabel")
            });
            __alloyId8.add(__alloyId16);
            var __alloyId18 = Ti.UI.createTextArea({
                top: 40,
                left: 10,
                right: 10,
                height: 150,
                color: "black",
                value: "undefined" != typeof __alloyId5.__transform["content"] ? __alloyId5.__transform["content"] : __alloyId5.get("content")
            });
            __alloyId7.add(__alloyId18);
            updateContent ? __alloyId18.addEventListener("change", updateContent) : __defers["__alloyId18!change!updateContent"] = true;
            refresh ? __alloyId18.addEventListener("blur", refresh) : __defers["__alloyId18!blur!refresh"] = true;
            var __alloyId20 = Ti.UI.createView({
                height: 300
            });
            __alloyId7.add(__alloyId20);
            var __alloyId22 = Ti.UI.createImageView({
                bottom: 10,
                height: 300,
                width: 300,
                backgroundColor: "#159dbe",
                src: "undefined" != typeof __alloyId5.__transform["image"] ? __alloyId5.__transform["image"] : __alloyId5.get("image")
            });
            __alloyId20.add(__alloyId22);
            var __alloyId24 = Ti.UI.createLabel({
                textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
                color: "white",
                bottom: 10,
                textid: "item_updateImage"
            });
            __alloyId20.add(__alloyId24);
            var __alloyId26 = Ti.UI.createView({
                layout: "horizontal",
                height: 15,
                bottom: 10,
                left: 10,
                right: 10
            });
            __alloyId7.add(__alloyId26);
            var __alloyId28 = Ti.UI.createLabel({
                color: "#938d91",
                width: Ti.UI.SIZE,
                textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
                right: 5,
                font: {
                    fontSize: 10
                },
                textid: "item_last_modified"
            });
            __alloyId26.add(__alloyId28);
            var __alloyId30 = Ti.UI.createLabel({
                color: "#938d91",
                width: Ti.UI.SIZE,
                font: {
                    fontSize: 10
                },
                text: "undefined" != typeof __alloyId5.__transform["readabledate"] ? __alloyId5.__transform["readabledate"] : __alloyId5.get("readabledate")
            });
            __alloyId26.add(__alloyId30);
        }
    }
    function instanceViewFilter(collection) {
        var result = [ collection.get(itemId) ];
        return result;
    }
    function doTransform(model) {
        var result = model.toJSON();
        result.readabledate = new Date(result.lastmoddt).toLocaleString();
        result.statusLabel = result.completed ? "item_complete" : "item_pending";
        result.pendingOpacity = result.completed ? 0 : 1;
        result.completedOpacity = 1 - result.pendingOpacity;
        return result;
    }
    function toggleStatus() {
        Alloy.Collections.todo.toggle(itemId);
        updateUi();
    }
    function updateContent(evt) {
        Alloy.Collections.todo.updateContent(itemId, evt.value);
    }
    function refresh() {
        Alloy.Collections.todo.fetch({
            success: updateUi
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "todoItem";
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
    Alloy.Collections.instance("todo");
    $.__views.todoItem = Ti.UI.createScrollView({
        backgroundColor: "white",
        height: Ti.UI.SIZE,
        layout: "vertical",
        dataFunction: "updateUi",
        dataTransform: "doTransform",
        id: "todoItem"
    });
    var __alloyId31 = Alloy.Collections["todo"] || todo;
    __alloyId31.on("fetch destroy change add remove reset", updateUi);
    $.__views.todoItem && $.addTopLevelView($.__views.todoItem);
    exports.destroy = function() {
        __alloyId31.off("fetch destroy change add remove reset", updateUi);
    };
    _.extend($, $.__views);
    var args = arguments[0] || {}, itemId = args.itemId;
    refresh();
    __defers["__alloyId10!click!toggleStatus"] && __alloyId10.addEventListener("click", toggleStatus);
    __defers["__alloyId18!change!updateContent"] && __alloyId18.addEventListener("change", updateContent);
    __defers["__alloyId18!blur!refresh"] && __alloyId18.addEventListener("blur", refresh);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;