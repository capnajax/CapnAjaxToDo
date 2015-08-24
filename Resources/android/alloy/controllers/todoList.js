function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function transform(collection) {
        var result = _.map(collection, function(model) {
            model = model.toJSON();
            return {
                template: "todoItem",
                properties: {
                    itemId: model.id,
                    height: 50,
                    searchableText: model.content
                },
                pending: {
                    opacity: model.completed ? 0 : 1
                },
                completed: {
                    opacity: model.completed ? 1 : 0
                },
                content: {
                    text: model.content
                }
            };
        });
        return result;
    }
    function newTodo() {
        var newModel = Alloy.createModel("todo");
        newModel.save();
        Alloy.Collections.todo.fetch();
        openDetail(newModel.id);
    }
    function openDetail(id) {
        var editItemScreen = Alloy.createController("todoItem", {
            itemId: id
        });
        editItemScreen.getView().addEventListener("close", function() {
            Ti.API.debug("refreshing list");
            refreshData();
        });
        Alloy.Globals.navigation.advance(editItemScreen.getView());
    }
    function refreshData() {
        todo.fetch();
        $.pendingTodos.setItems(transform(todo.pending()));
        $.completedTodos.setItems(transform(todo.completed()));
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "todoList";
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
    $.__views.todoList = Ti.UI.createView({
        id: "todoList"
    });
    $.__views.todoList && $.addTopLevelView($.__views.todoList);
    $.__views.dummy = Ti.UI.createTextField({
        id: "dummy"
    });
    $.__views.todoList.add($.__views.dummy);
    $.__views.search = Ti.UI.createSearchBar({
        id: "search",
        showCancel: "true"
    });
    var __alloyId32 = {};
    var __alloyId35 = [];
    var __alloyId37 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId38 = [];
            var __alloyId40 = {
                type: "Ti.UI.View",
                bindId: "status",
                childTemplates: function() {
                    var __alloyId41 = [];
                    var __alloyId43 = {
                        type: "Ti.UI.ImageView",
                        bindId: "completed",
                        properties: {
                            width: 24,
                            height: 24,
                            image: "/checkbox_checked.png",
                            bindId: "completed"
                        }
                    };
                    __alloyId41.push(__alloyId43);
                    var __alloyId45 = {
                        type: "Ti.UI.ImageView",
                        bindId: "pending",
                        properties: {
                            width: 24,
                            height: 24,
                            image: "/checkbox_unchecked.png",
                            bindId: "pending"
                        }
                    };
                    __alloyId41.push(__alloyId45);
                    return __alloyId41;
                }(),
                properties: {
                    top: 0,
                    left: 0,
                    width: 40,
                    bottom: 0,
                    bindId: "status"
                }
            };
            __alloyId38.push(__alloyId40);
            var __alloyId47 = {
                type: "Ti.UI.ImageView",
                bindId: "image",
                properties: {
                    right: 0,
                    bindId: "image"
                }
            };
            __alloyId38.push(__alloyId47);
            var __alloyId49 = {
                type: "Ti.UI.Label",
                bindId: "content",
                properties: {
                    left: 40,
                    right: 20,
                    ellipsize: Ti.UI.TEXT_ELLIPSIZE_TRUNCATE_END,
                    wordWrap: false,
                    color: "black",
                    bindId: "content"
                }
            };
            __alloyId38.push(__alloyId49);
            return __alloyId38;
        }(),
        properties: {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        }
    };
    __alloyId35.push(__alloyId37);
    var __alloyId34 = {
        properties: {
            name: "todoItem"
        },
        childTemplates: __alloyId35
    };
    __alloyId32["todoItem"] = __alloyId34;
    $.__views.pendingHeaderView = Ti.UI.createView({
        width: "100%",
        height: 50,
        backgroundColor: "#99FFFFFF",
        id: "pendingHeaderView"
    });
    $.__views.pendingHeaderLabel = Ti.UI.createLabel({
        left: 10,
        right: 50,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: 24,
            fontFamily: "Helvetica,sans-serif"
        },
        color: "#193380",
        id: "pendingHeaderLabel",
        textid: "list_pending"
    });
    $.__views.pendingHeaderView.add($.__views.pendingHeaderLabel);
    $.__views.newTodo = Ti.UI.createButton({
        width: 40,
        right: 10,
        title: "+",
        color: "#193380",
        id: "newTodo"
    });
    $.__views.pendingHeaderView.add($.__views.newTodo);
    newTodo ? $.__views.newTodo.addEventListener("click", newTodo) : __defers["$.__views.newTodo!click!newTodo"] = true;
    $.__views.pendingTodos = Ti.UI.createListSection({
        defaultItemTemplate: "todoItem",
        headerView: $.__views.pendingHeaderView,
        id: "pendingTodos"
    });
    var __alloyId51 = [];
    __alloyId51.push($.__views.pendingTodos);
    $.__views.completedHeaderView = Ti.UI.createView({
        width: "100%",
        height: 50,
        backgroundColor: "#99FFFFFF",
        id: "completedHeaderView"
    });
    $.__views.completedHeaderLabel = Ti.UI.createLabel({
        left: 10,
        right: 50,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: 24,
            fontFamily: "Helvetica,sans-serif"
        },
        color: "#193380",
        id: "completedHeaderLabel",
        textid: "list_complete"
    });
    $.__views.completedHeaderView.add($.__views.completedHeaderLabel);
    $.__views.completedTodos = Ti.UI.createListSection({
        defaultItemTemplate: "todoItem",
        headerView: $.__views.completedHeaderView,
        id: "completedTodos"
    });
    __alloyId51.push($.__views.completedTodos);
    $.__views.todoListListView = Ti.UI.createListView({
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "white",
        sections: __alloyId51,
        templates: __alloyId32,
        searchView: $.__views.search,
        id: "todoListListView"
    });
    $.__views.todoList.add($.__views.todoListListView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var todo = (arguments[0] || {}, Alloy.Collections.todo);
    !function() {
        $.todoListListView.addEventListener("itemclick", function(evt) {
            if (_.contains([ "completed", "pending", "status" ], evt.bindId)) {
                var item = evt.section.getItemAt(evt.itemIndex);
                item.completed.opacity = 1 - item.completed.opacity;
                item.pending.opacity = 1 - item.pending.opacity;
                evt.section.updateItemAt(evt.itemIndex, item);
                todo.toggle(evt.itemId, {
                    success: refreshData
                });
                setTimeout(refreshData, 500);
            } else openDetail(evt.itemId);
        });
        refreshData();
    }();
    __defers["$.__views.newTodo!click!newTodo"] && $.__views.newTodo.addEventListener("click", newTodo);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;