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
        var models = instanceViewFilter(__alloyId24);
        var len = models.length;
        var children = $.__views.todoItem.children;
        for (var d = children.length - 1; d >= 0; d--) $.__views.todoItem.remove(children[d]);
        for (var i = 0; len > i; i++) {
            var __alloyId2 = models[i];
            __alloyId2.__transform = doTransform(__alloyId2);
            var __alloyId4 = Ti.UI.createView({});
            $.__views.todoItem.add(__alloyId4);
            var __alloyId5 = Ti.UI.createView({
                top: 0,
                left: 10,
                right: 10,
                height: 50
            });
            __alloyId4.add(__alloyId5);
            var __alloyId7 = Ti.UI.createLabel({
                top: 0,
                left: 0,
                width: 30,
                height: 40,
                font: {
                    fontFamily: "FontAwesome"
                },
                text: "undefined" != typeof __alloyId2.__transform["statusIcon"] ? __alloyId2.__transform["statusIcon"] : __alloyId2.get("statusIcon")
            });
            __alloyId5.add(__alloyId7);
            toggleStatus ? __alloyId7.addEventListener("click", toggleStatus) : __defers["__alloyId7!click!toggleStatus"] = true;
            var __alloyId9 = Ti.UI.createLabel({
                textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
                left: 30,
                right: 0,
                font: {
                    fontSize: 24,
                    fontFamily: "Helvetica,sans-serif"
                },
                color: "#193380",
                textid: "undefined" != typeof __alloyId2.__transform["statusLabel"] ? __alloyId2.__transform["statusLabel"] : __alloyId2.get("statusLabel")
            });
            __alloyId5.add(__alloyId9);
            var __alloyId11 = Ti.UI.createTextArea({
                top: 40,
                left: 10,
                right: 10,
                bottom: 345,
                value: "undefined" != typeof __alloyId2.__transform["content"] ? __alloyId2.__transform["content"] : __alloyId2.get("content")
            });
            __alloyId4.add(__alloyId11);
            updateContent ? __alloyId11.addEventListener("change", updateContent) : __defers["__alloyId11!change!updateContent"] = true;
            var __alloyId13 = Ti.UI.createView({
                height: 300,
                bottom: 25
            });
            __alloyId4.add(__alloyId13);
            var __alloyId15 = Ti.UI.createImageView({
                bottom: 10,
                height: 300,
                width: 300,
                backgroundColor: "#159dbe",
                src: "undefined" != typeof __alloyId2.__transform["image"] ? __alloyId2.__transform["image"] : __alloyId2.get("image")
            });
            __alloyId13.add(__alloyId15);
            var __alloyId17 = Ti.UI.createLabel({
                textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
                color: "white",
                bottom: 10,
                textid: "item_updateImage"
            });
            __alloyId13.add(__alloyId17);
            var __alloyId19 = Ti.UI.createView({
                layout: "horizontal",
                height: 15,
                bottom: 10,
                left: 10,
                right: 10
            });
            __alloyId4.add(__alloyId19);
            var __alloyId21 = Ti.UI.createLabel({
                color: "#938d91",
                width: Ti.UI.SIZE,
                textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
                right: 5,
                font: {
                    fontSize: 10
                },
                textid: "item-last-modified"
            });
            __alloyId19.add(__alloyId21);
            var __alloyId23 = Ti.UI.createLabel({
                color: "#938d91",
                width: Ti.UI.SIZE,
                font: {
                    fontSize: 10
                },
                text: "undefined" != typeof __alloyId2.__transform["readabledate"] ? __alloyId2.__transform["readabledate"] : __alloyId2.get("readabledate")
            });
            __alloyId19.add(__alloyId23);
        }
    }
    function instanceViewFilter(collection) {
        var result = collection.where({
            id: itemId
        });
        Ti.API.debug("todo.result on itemId " + itemId + " == " + JSON.stringify(result));
        return result;
    }
    function doTransform(model) {
        var result = model.toJSON();
        result.readabledate = new Date(result.lastmoddt).toLocaleString();
        result.statusIcon = String.fromCharCode(fa.charcode[result.completed ? "fa-check-circle-o" : "fa-circle-o"]);
        result.statusLabel = result.completed ? "item_complete" : "item_pending";
        Ti.API.debug("todo.transform, result: " + JSON.stringify(result));
        return result;
    }
    function toggleStatus() {
        Alloy.Collections.todo.toggle(itemId);
        updateUi();
    }
    function updateContent(evt) {
        Alloy.Collections.todo.updateContent(itemId, evt.value);
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
    $.__views.todoItem = Ti.UI.createView({
        backgroundColor: "white",
        dataFunction: "updateUi",
        dataTransform: "doTransform",
        id: "todoItem"
    });
    var __alloyId24 = Alloy.Collections["todo"] || todo;
    __alloyId24.on("fetch destroy change add remove reset", updateUi);
    $.__views.todoItem && $.addTopLevelView($.__views.todoItem);
    exports.destroy = function() {
        __alloyId24.off("fetch destroy change add remove reset", updateUi);
    };
    _.extend($, $.__views);
    var args = arguments[0] || {}, fa = require("FontAwesome"), itemId = args.itemId;
    updateUi();
    __defers["__alloyId7!click!toggleStatus"] && __alloyId7.addEventListener("click", toggleStatus);
    __defers["__alloyId11!change!updateContent"] && __alloyId11.addEventListener("change", updateContent);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;