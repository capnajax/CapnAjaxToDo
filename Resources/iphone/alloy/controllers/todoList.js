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
                completed: {
                    text: model.completed ? icons.completed : icons.pending,
                    font: {
                        fontFamily: fa.fontfamily,
                        fontSize: 18
                    }
                },
                content: {
                    text: model.content
                }
            };
        });
        Ti.API.debug("transform returns " + JSON.stringify(result));
        return result;
    }
    function newTodo() {
        var newModel = Alloy.createModel("todo");
        Ti.API.debug("newModel1: " + JSON.stringify(newModel));
        newModel.save();
        Alloy.Collections.todo.fetch();
        Ti.API.debug("newModel2: " + JSON.stringify(newModel));
        openDetail(newModel.id);
    }
    function openDetail(id) {
        var editItemScreen = Alloy.createController("todoItem", {
            itemId: id
        });
        editItemScreen.getView().addEventListener("close", refreshData);
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
    var __alloyId25 = {};
    var __alloyId28 = [];
    var __alloyId30 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId31 = [];
            var __alloyId33 = {
                type: "Ti.UI.Label",
                bindId: "completed",
                properties: {
                    top: 0,
                    left: 0,
                    width: 40,
                    bottom: 0,
                    textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
                    bindId: "completed"
                }
            };
            __alloyId31.push(__alloyId33);
            var __alloyId35 = {
                type: "Ti.UI.ImageView",
                bindId: "image",
                properties: {
                    right: 0,
                    bindId: "image"
                }
            };
            __alloyId31.push(__alloyId35);
            var __alloyId37 = {
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
            __alloyId31.push(__alloyId37);
            return __alloyId31;
        }(),
        properties: {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        }
    };
    __alloyId28.push(__alloyId30);
    var __alloyId27 = {
        properties: {
            name: "todoItem"
        },
        childTemplates: __alloyId28
    };
    __alloyId25["todoItem"] = __alloyId27;
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
    var __alloyId39 = [];
    __alloyId39.push($.__views.pendingTodos);
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
    __alloyId39.push($.__views.completedTodos);
    $.__views.todoListListView = Ti.UI.createListView({
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "white",
        sections: __alloyId39,
        templates: __alloyId25,
        searchView: $.__views.search,
        id: "todoListListView"
    });
    $.__views.todoList.add($.__views.todoListListView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var todo = (arguments[0] || {}, Alloy.Collections.todo), fa = require("FontAwesome");
    var icons = {
        completed: String.fromCharCode(fa.charcode["fa-check-circle-o"]),
        pending: String.fromCharCode(fa.charcode["fa-circle-o"]),
        updating: String.fromCharCode(fa.charcode["fa-clock-o"])
    };
    var db = Ti.Database.open("_alloy_");
    db.execute("INSERT INTO todo (completed, content) VALUES (0, 'test content');");
    Ti.API.debug(db.execute("select * from todo").rowCount);
    db.close();
    var db = Ti.Database.open("_alloy_");
    Ti.API.debug(db.execute("select * from todo").rowCount);
    db.close();
    !function() {
        $.todoListListView.addEventListener("itemclick", function(evt) {
            if ("completed" === evt.bindId) {
                Ti.API.debug("toggleStatus on id=" + evt.itemId);
                var item = evt.section.getItemAt(evt.itemIndex);
                item.completed.text = icons.updating;
                evt.section.updateItemAt(evt.itemIndex, item);
                todo.toggle(evt.itemId);
                setTimeout(refreshData, 500);
            } else {
                Ti.API.debug("itemClick on id " + evt.itemId);
                openDetail(evt.itemId);
            }
        });
        refreshData();
    }();
    __defers["$.__views.newTodo!click!newTodo"] && $.__views.newTodo.addEventListener("click", newTodo);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;