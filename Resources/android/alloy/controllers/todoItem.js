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
        var models = instanceViewFilter(__alloyId45);
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
            var __alloyId9 = Ti.UI.createButton({
                right: 10,
                top: 10,
                width: Titanium.UI.SIZE,
                textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
                titleid: "item_share"
            });
            __alloyId7.add(__alloyId9);
            share ? __alloyId9.addEventListener("click", share) : __defers["__alloyId9!click!share"] = true;
            var __alloyId10 = Ti.UI.createView({
                top: 0,
                left: 10,
                right: 10,
                height: 50,
                layout: "horizontal"
            });
            __alloyId7.add(__alloyId10);
            var __alloyId12 = Ti.UI.createView({
                width: 40,
                bindId: "status"
            });
            __alloyId10.add(__alloyId12);
            toggleStatus ? __alloyId12.addEventListener("click", toggleStatus) : __defers["__alloyId12!click!toggleStatus"] = true;
            var __alloyId14 = Ti.UI.createImageView({
                width: 24,
                height: 24,
                image: "/checkbox_checked.png",
                opacity: "undefined" != typeof __alloyId5.__transform["completedOpacity"] ? __alloyId5.__transform["completedOpacity"] : __alloyId5.get("completedOpacity")
            });
            __alloyId12.add(__alloyId14);
            var __alloyId16 = Ti.UI.createImageView({
                width: 24,
                height: 24,
                image: "/checkbox_unchecked.png",
                opacity: "undefined" != typeof __alloyId5.__transform["pendingOpacity"] ? __alloyId5.__transform["pendingOpacity"] : __alloyId5.get("pendingOpacity")
            });
            __alloyId12.add(__alloyId16);
            var __alloyId18 = Ti.UI.createLabel({
                textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
                width: Titanium.UI.SIZE,
                font: {
                    fontSize: 24,
                    fontFamily: "Helvetica,sans-serif"
                },
                color: "#193380",
                textid: "undefined" != typeof __alloyId5.__transform["statusLabel"] ? __alloyId5.__transform["statusLabel"] : __alloyId5.get("statusLabel")
            });
            __alloyId10.add(__alloyId18);
            var __alloyId20 = Ti.UI.createTextArea({
                top: 40,
                left: 10,
                right: 10,
                height: 150,
                color: "black",
                value: "undefined" != typeof __alloyId5.__transform["content"] ? __alloyId5.__transform["content"] : __alloyId5.get("content")
            });
            __alloyId7.add(__alloyId20);
            updateContent ? __alloyId20.addEventListener("change", updateContent) : __defers["__alloyId20!change!updateContent"] = true;
            refresh ? __alloyId20.addEventListener("blur", refresh) : __defers["__alloyId20!blur!refresh"] = true;
            var __alloyId22 = Ti.UI.createView({
                height: 300,
                roleid: "imageContainer"
            });
            __alloyId7.add(__alloyId22);
            updatePhoto ? __alloyId22.addEventListener("click", updatePhoto) : __defers["__alloyId22!click!updatePhoto"] = true;
            var __alloyId24 = Ti.UI.createImageView({
                bottom: 10,
                height: 300,
                width: 300,
                backgroundColor: "#159dbe",
                image: "undefined" != typeof __alloyId5.__transform["image"] ? __alloyId5.__transform["image"] : __alloyId5.get("image")
            });
            __alloyId22.add(__alloyId24);
            var __alloyId26 = Ti.UI.createLabel({
                textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
                color: "white",
                bottom: 10,
                textid: "item_updateImage",
                roleid: "updateImageButton"
            });
            __alloyId22.add(__alloyId26);
            var __alloyId28 = Ti.UI.createView({
                bottom: 10,
                height: 300,
                width: 300,
                visible: false,
                roleid: "imageOptionsContainer"
            });
            __alloyId22.add(__alloyId28);
            var __alloyId30 = Ti.UI.createButton({
                width: 120,
                height: 120,
                borderRadius: 60,
                borderColor: "white",
                color: "white",
                backgroundColor: "#33000000",
                top: 20,
                left: 20,
                titleid: "image_camera"
            });
            __alloyId28.add(__alloyId30);
            updatePhotoCamera ? __alloyId30.addEventListener("click", updatePhotoCamera) : __defers["__alloyId30!click!updatePhotoCamera"] = true;
            var __alloyId32 = Ti.UI.createButton({
                width: 120,
                height: 120,
                borderRadius: 60,
                borderColor: "white",
                color: "white",
                backgroundColor: "#33000000",
                top: 20,
                right: 20,
                titleid: "image_gallery"
            });
            __alloyId28.add(__alloyId32);
            updatePhotoGallery ? __alloyId32.addEventListener("click", updatePhotoGallery) : __defers["__alloyId32!click!updatePhotoGallery"] = true;
            var __alloyId34 = Ti.UI.createButton({
                width: 120,
                height: 120,
                borderRadius: 60,
                borderColor: "red",
                color: "white",
                backgroundColor: "#33000000",
                bottom: 20,
                right: 20,
                titleid: "image_delete"
            });
            __alloyId28.add(__alloyId34);
            updatePhotoDelete ? __alloyId34.addEventListener("click", updatePhotoDelete) : __defers["__alloyId34!click!updatePhotoDelete"] = true;
            var __alloyId36 = Ti.UI.createButton({
                width: 120,
                height: 120,
                borderRadius: 60,
                borderColor: "white",
                color: "white",
                backgroundColor: "#33000000",
                bottom: 20,
                left: 20,
                titleid: "image_cancel"
            });
            __alloyId28.add(__alloyId36);
            updatePhotoCancel ? __alloyId36.addEventListener("click", updatePhotoCancel) : __defers["__alloyId36!click!updatePhotoCancel"] = true;
            var __alloyId38 = Ti.UI.createView({
                layout: "horizontal",
                height: 15,
                bottom: 10,
                left: 10,
                right: 10
            });
            __alloyId7.add(__alloyId38);
            var __alloyId40 = Ti.UI.createLabel({
                color: "#938d91",
                width: Ti.UI.SIZE,
                textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
                right: 5,
                font: {
                    fontSize: 10
                },
                textid: "item_last_modified"
            });
            __alloyId38.add(__alloyId40);
            var __alloyId42 = Ti.UI.createLabel({
                color: "#938d91",
                width: Ti.UI.SIZE,
                font: {
                    fontSize: 10
                },
                text: "undefined" != typeof __alloyId5.__transform["readabledate"] ? __alloyId5.__transform["readabledate"] : __alloyId5.get("readabledate")
            });
            __alloyId38.add(__alloyId42);
            var __alloyId44 = Ti.UI.createButton({
                titleid: "item_delete"
            });
            __alloyId7.add(__alloyId44);
            deleteItem ? __alloyId44.addEventListener("click", deleteItem) : __defers["__alloyId44!click!deleteItem"] = true;
        }
    }
    function instanceViewFilter(collection) {
        var result = [ collection.get(itemId) ];
        return result;
    }
    function doTransform(model) {
        if (!model) return {};
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
    function findImageContainer(startingPoint) {
        if ("imageContainer" === startingPoint.roleid) return startingPoint;
        if (startingPoint.parent) return findImageContainer(startingPoint.parent);
    }
    function findImageOptionsContainer(parent) {
        if (parent) return _.findWhere(parent.children, {
            roleid: "imageOptionsContainer"
        });
    }
    function findUpdateImageLabel(parent) {
        if (parent) return _.findWhere(parent.children, {
            roleid: "updateImageButton"
        });
    }
    function updatePhoto(evt) {
        Ti.API.debug(JSON.stringify(evt.source));
        try {
            var parent = findImageContainer(evt.source);
            findImageOptionsContainer(parent).visible = true;
            findUpdateImageLabel(parent).visible = false;
        } catch (e) {
            Ti.API.warn("todoItem::updatePhoto could not find an element or container, e == " + JSON.stringify(e));
        }
    }
    function updatePhotoCancel(evt) {
        try {
            var parent = findImageContainer(evt.source);
            findImageOptionsContainer(parent).visible = false;
            findUpdateImageLabel(parent).visible = true;
            evt.cancelBubble = true;
        } catch (e) {
            Ti.API.warn("todoItem::updatePhotoCancel could not find an element or container, e == " + JSON.stringify(e));
        }
    }
    function updatePhotoCamera() {
        Ti.Media.showCamera({
            success: function(evt) {
                evt.mediaType === Ti.Media.MEDIA_TYPE_PHOTO && Alloy.Collections.todo.updatePhoto(itemId, evt.media, {
                    success: refresh
                });
            }
        });
    }
    function updatePhotoGallery() {
        Ti.Media.openPhotoGallery({
            mediaTypes: Ti.Media.MEDIA_TYPE_PHOTO,
            success: function(evt) {
                evt.mediaType === Ti.Media.MEDIA_TYPE_PHOTO && Alloy.Collections.todo.updatePhoto(itemId, evt.media, {
                    success: refresh
                });
            }
        });
    }
    function updatePhotoDelete() {
        Alloy.Collections.todo.updatePhoto(itemId, null, {
            success: refresh
        });
    }
    function deleteItem() {
        Alloy.Collections.todo.deleteItem(itemId);
        Alloy.Globals.navigation.retreat();
    }
    function share() {
        var todoItem = Alloy.Collections.todo.get(itemId), dir = Ti.Filesystem.externalStorageDirectory;
        tempFile = Ti.Filesystem.getFile(dir, "todo.jpg"), content = todoItem.get("content"), 
        shareOpts = {
            status: content,
            image: todoItem.get("image") ? tempFile.nativePath : null,
            androidDialogTitle: L("item_share")
        };
        tempFile.write(todoItem.get("image"));
        tempFile = null;
        Ti.API.debug("shareOpts == " + JSON.stringify(shareOpts));
        _.defer(function() {
            require("com.alcoapps.socialshare").share(shareOpts);
        });
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
    var __alloyId45 = Alloy.Collections["todo"] || todo;
    __alloyId45.on("fetch destroy change add remove reset", updateUi);
    $.__views.todoItem && $.addTopLevelView($.__views.todoItem);
    exports.destroy = function() {
        __alloyId45.off("fetch destroy change add remove reset", updateUi);
    };
    _.extend($, $.__views);
    var args = arguments[0] || {}, itemId = args.itemId;
    refresh();
    __defers["__alloyId9!click!share"] && __alloyId9.addEventListener("click", share);
    __defers["__alloyId12!click!toggleStatus"] && __alloyId12.addEventListener("click", toggleStatus);
    __defers["__alloyId20!change!updateContent"] && __alloyId20.addEventListener("change", updateContent);
    __defers["__alloyId20!blur!refresh"] && __alloyId20.addEventListener("blur", refresh);
    __defers["__alloyId22!click!updatePhoto"] && __alloyId22.addEventListener("click", updatePhoto);
    __defers["__alloyId30!click!updatePhotoCamera"] && __alloyId30.addEventListener("click", updatePhotoCamera);
    __defers["__alloyId32!click!updatePhotoGallery"] && __alloyId32.addEventListener("click", updatePhotoGallery);
    __defers["__alloyId34!click!updatePhotoDelete"] && __alloyId34.addEventListener("click", updatePhotoDelete);
    __defers["__alloyId36!click!updatePhotoCancel"] && __alloyId36.addEventListener("click", updatePhotoCancel);
    __defers["__alloyId44!click!deleteItem"] && __alloyId44.addEventListener("click", deleteItem);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;