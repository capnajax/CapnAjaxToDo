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
        var models = instanceViewFilter(__alloyId27);
        var len = models.length;
        var children = $.__views.todoItem.children;
        for (var d = children.length - 1; d >= 0; d--) $.__views.todoItem.remove(children[d]);
        for (var i = 0; len > i; i++) {
            var __alloyId5 = models[i];
            __alloyId5.__transform = doTransform(__alloyId5);
            var __alloyId7 = Ti.UI.createView({});
            $.__views.todoItem.add(__alloyId7);
            var __alloyId8 = Ti.UI.createView({
                top: 0,
                left: 10,
                right: 10,
                height: 50
            });
            __alloyId7.add(__alloyId8);
            var __alloyId10 = Ti.UI.createLabel({
                top: 0,
                left: 0,
                width: 30,
                height: 40,
                text: "undefined" != typeof __alloyId5.__transform["statusIcon"] ? __alloyId5.__transform["statusIcon"] : __alloyId5.get("statusIcon")
            });
            __alloyId8.add(__alloyId10);
            toggleStatus ? __alloyId10.addEventListener("click", toggleStatus) : __defers["__alloyId10!click!toggleStatus"] = true;
            var __alloyId12 = Ti.UI.createLabel({
                textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
                left: 30,
                right: 0,
                font: {
                    fontSize: 24,
                    fontFamily: "Helvetica,sans-serif"
                },
                color: "#193380",
                textid: "undefined" != typeof __alloyId5.__transform["statusLabel"] ? __alloyId5.__transform["statusLabel"] : __alloyId5.get("statusLabel")
            });
            __alloyId8.add(__alloyId12);
            var __alloyId14 = Ti.UI.createTextArea({
                top: 40,
                left: 10,
                right: 10,
                bottom: 345,
                value: "undefined" != typeof __alloyId5.__transform["content"] ? __alloyId5.__transform["content"] : __alloyId5.get("content")
            });
            __alloyId7.add(__alloyId14);
            updateContent ? __alloyId14.addEventListener("change", updateContent) : __defers["__alloyId14!change!updateContent"] = true;
            var __alloyId16 = Ti.UI.createView({
                height: 300,
                bottom: 25
            });
            __alloyId7.add(__alloyId16);
            var __alloyId18 = Ti.UI.createImageView({
                bottom: 10,
                height: 300,
                width: 300,
                backgroundColor: "#159dbe",
                src: "undefined" != typeof __alloyId5.__transform["image"] ? __alloyId5.__transform["image"] : __alloyId5.get("image")
            });
            __alloyId16.add(__alloyId18);
            var __alloyId20 = Ti.UI.createLabel({
                textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
                color: "white",
                bottom: 10,
                textid: "item_updateImage"
            });
            __alloyId16.add(__alloyId20);
            var __alloyId22 = Ti.UI.createView({
                layout: "horizontal",
                height: 15,
                bottom: 10,
                left: 10,
                right: 10
            });
            __alloyId7.add(__alloyId22);
            var __alloyId24 = Ti.UI.createLabel({
                color: "#938d91",
                width: Ti.UI.SIZE,
                textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
                right: 5,
                font: {
                    fontSize: 10
                },
                textid: "item-last-modified"
            });
            __alloyId22.add(__alloyId24);
            var __alloyId26 = Ti.UI.createLabel({
                color: "#938d91",
                width: Ti.UI.SIZE,
                font: {
                    fontSize: 10
                },
                text: "undefined" != typeof __alloyId5.__transform["readabledate"] ? __alloyId5.__transform["readabledate"] : __alloyId5.get("readabledate")
            });
            __alloyId22.add(__alloyId26);
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
    var __alloyId27 = Alloy.Collections["todo"] || todo;
    __alloyId27.on("fetch destroy change add remove reset", updateUi);
    $.__views.todoItem && $.addTopLevelView($.__views.todoItem);
    exports.destroy = function() {
        __alloyId27.off("fetch destroy change add remove reset", updateUi);
    };
    _.extend($, $.__views);
    var args = arguments[0] || {}, fa = require("FontAwesome"), itemId = args.itemId;
    updateUi();
    __defers["__alloyId10!click!toggleStatus"] && __alloyId10.addEventListener("click", toggleStatus);
    __defers["__alloyId14!change!updateContent"] && __alloyId14.addEventListener("change", updateContent);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;