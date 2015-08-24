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
        var models = instanceViewFilter(__alloyId28);
        var len = models.length;
        var children = $.__views.todoItem.children;
        for (var d = children.length - 1; d >= 0; d--) $.__views.todoItem.remove(children[d]);
        for (var i = 0; len > i; i++) {
            var __alloyId2 = models[i];
            __alloyId2.__transform = doTransform(__alloyId2);
            var __alloyId4 = Ti.UI.createView({
                height: Ti.UI.SIZE,
                layout: "vertical"
            });
            $.__views.todoItem.add(__alloyId4);
            var __alloyId5 = Ti.UI.createView({
                top: 0,
                left: 10,
                right: 10,
                height: 50,
                layout: "horizontal"
            });
            __alloyId4.add(__alloyId5);
            var __alloyId7 = Ti.UI.createView({
                width: 40,
                bindId: "status"
            });
            __alloyId5.add(__alloyId7);
            toggleStatus ? __alloyId7.addEventListener("click", toggleStatus) : __defers["__alloyId7!click!toggleStatus"] = true;
            var __alloyId9 = Ti.UI.createImageView({
                width: 24,
                height: 24,
                image: "/checkbox_checked.png",
                opacity: "undefined" != typeof __alloyId2.__transform["completedOpacity"] ? __alloyId2.__transform["completedOpacity"] : __alloyId2.get("completedOpacity")
            });
            __alloyId7.add(__alloyId9);
            var __alloyId11 = Ti.UI.createImageView({
                width: 24,
                height: 24,
                image: "/checkbox_unchecked.png",
                opacity: "undefined" != typeof __alloyId2.__transform["pendingOpacity"] ? __alloyId2.__transform["pendingOpacity"] : __alloyId2.get("pendingOpacity")
            });
            __alloyId7.add(__alloyId11);
            var __alloyId13 = Ti.UI.createLabel({
                textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
                width: Titanium.UI.SIZE,
                font: {
                    fontSize: 24,
                    fontFamily: "Helvetica,sans-serif"
                },
                color: "#193380",
                textid: "undefined" != typeof __alloyId2.__transform["statusLabel"] ? __alloyId2.__transform["statusLabel"] : __alloyId2.get("statusLabel")
            });
            __alloyId5.add(__alloyId13);
            var __alloyId15 = Ti.UI.createTextArea({
                top: 40,
                left: 10,
                right: 10,
                height: 150,
                color: "black",
                value: "undefined" != typeof __alloyId2.__transform["content"] ? __alloyId2.__transform["content"] : __alloyId2.get("content")
            });
            __alloyId4.add(__alloyId15);
            updateContent ? __alloyId15.addEventListener("change", updateContent) : __defers["__alloyId15!change!updateContent"] = true;
            refresh ? __alloyId15.addEventListener("blur", refresh) : __defers["__alloyId15!blur!refresh"] = true;
            var __alloyId17 = Ti.UI.createView({
                height: 300
            });
            __alloyId4.add(__alloyId17);
            var __alloyId19 = Ti.UI.createImageView({
                bottom: 10,
                height: 300,
                width: 300,
                backgroundColor: "#159dbe",
                src: "undefined" != typeof __alloyId2.__transform["image"] ? __alloyId2.__transform["image"] : __alloyId2.get("image")
            });
            __alloyId17.add(__alloyId19);
            var __alloyId21 = Ti.UI.createLabel({
                textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
                color: "white",
                bottom: 10,
                textid: "item_updateImage"
            });
            __alloyId17.add(__alloyId21);
            var __alloyId23 = Ti.UI.createView({
                layout: "horizontal",
                height: 15,
                bottom: 10,
                left: 10,
                right: 10
            });
            __alloyId4.add(__alloyId23);
            var __alloyId25 = Ti.UI.createLabel({
                color: "#938d91",
                width: Ti.UI.SIZE,
                textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
                right: 5,
                font: {
                    fontSize: 10
                },
                textid: "item_last_modified"
            });
            __alloyId23.add(__alloyId25);
            var __alloyId27 = Ti.UI.createLabel({
                color: "#938d91",
                width: Ti.UI.SIZE,
                font: {
                    fontSize: 10
                },
                text: "undefined" != typeof __alloyId2.__transform["readabledate"] ? __alloyId2.__transform["readabledate"] : __alloyId2.get("readabledate")
            });
            __alloyId23.add(__alloyId27);
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
    var __alloyId28 = Alloy.Collections["todo"] || todo;
    __alloyId28.on("fetch destroy change add remove reset", updateUi);
    $.__views.todoItem && $.addTopLevelView($.__views.todoItem);
    exports.destroy = function() {
        __alloyId28.off("fetch destroy change add remove reset", updateUi);
    };
    _.extend($, $.__views);
    var args = arguments[0] || {}, itemId = args.itemId;
    refresh();
    __defers["__alloyId7!click!toggleStatus"] && __alloyId7.addEventListener("click", toggleStatus);
    __defers["__alloyId15!change!updateContent"] && __alloyId15.addEventListener("change", updateContent);
    __defers["__alloyId15!blur!refresh"] && __alloyId15.addEventListener("blur", refresh);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;