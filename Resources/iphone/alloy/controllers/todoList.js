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
            var content = {
                text: model.content
            };
            model.thumbnail || (content.right = 10);
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
                image: {
                    image: model.thumbnail
                },
                content: content
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
    $.__views.search = Ti.UI.createSearchBar({
        id: "search",
        showCancel: "true"
    });
    var __alloyId39 = {};
    var __alloyId42 = [];
    var __alloyId44 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId45 = [];
            var __alloyId47 = {
                type: "Ti.UI.View",
                bindId: "status",
                childTemplates: function() {
                    var __alloyId48 = [];
                    var __alloyId50 = {
                        type: "Ti.UI.ImageView",
                        bindId: "completed",
                        properties: {
                            width: 24,
                            height: 24,
                            image: "/checkbox_checked.png",
                            bindId: "completed"
                        }
                    };
                    __alloyId48.push(__alloyId50);
                    var __alloyId52 = {
                        type: "Ti.UI.ImageView",
                        bindId: "pending",
                        properties: {
                            width: 24,
                            height: 24,
                            image: "/checkbox_unchecked.png",
                            bindId: "pending"
                        }
                    };
                    __alloyId48.push(__alloyId52);
                    return __alloyId48;
                }(),
                properties: {
                    top: 0,
                    left: 0,
                    width: 40,
                    bottom: 0,
                    bindId: "status"
                }
            };
            __alloyId45.push(__alloyId47);
            var __alloyId54 = {
                type: "Ti.UI.Label",
                bindId: "content",
                properties: {
                    left: 40,
                    right: 50,
                    ellipsize: Ti.UI.TEXT_ELLIPSIZE_TRUNCATE_END,
                    wordWrap: false,
                    color: "black",
                    bindId: "content"
                }
            };
            __alloyId45.push(__alloyId54);
            var __alloyId56 = {
                type: "Ti.UI.ImageView",
                bindId: "image",
                properties: {
                    right: 10,
                    height: 30,
                    width: 30,
                    bindId: "image"
                }
            };
            __alloyId45.push(__alloyId56);
            return __alloyId45;
        }(),
        properties: {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        }
    };
    __alloyId42.push(__alloyId44);
    var __alloyId41 = {
        properties: {
            name: "todoItem"
        },
        childTemplates: __alloyId42
    };
    __alloyId39["todoItem"] = __alloyId41;
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
    var __alloyId58 = [];
    __alloyId58.push($.__views.pendingTodos);
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
    __alloyId58.push($.__views.completedTodos);
    $.__views.todoListListView = Ti.UI.createListView({
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "white",
        sections: __alloyId58,
        templates: __alloyId39,
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