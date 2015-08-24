var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

var fa = require("FontAwesome");

exports.definition = {
    config: {
        columns: {
            id: "INTEGER PRIMARY KEY AUTOINCREMENT",
            completed: "INTEGER",
            lastmoddt: "TEXT",
            image: "BLOB",
            content: "TEXT"
        },
        defaults: {
            completed: 0,
            image: null,
            lastmoddt: "0"
        },
        adapter: {
            type: "sql",
            collection_name: "todo",
            idAttribute: "id"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {
            updated: function() {
                this.save({
                    lastmoddt: new Date().toString()
                }, {
                    silent: true
                });
            }
        });
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {
            pending: function() {
                return this.where({
                    completed: 0
                });
            },
            completed: function() {
                return this.where({
                    completed: 1
                });
            },
            toggle: function(id) {
                var model = this.get(id);
                model.save({
                    completed: model.get("completed") ? 0 : 1
                });
                model.updated();
            },
            updateContent: function(id, content) {
                var model = this.get(id);
                model.save({
                    content: content
                }, {
                    silent: true
                });
                model.updated();
            },
            comparator: function(t1, t2) {
                var d1 = new Date(t1.get("lastmoddt")).getTime(), d2 = new Date(t2.get("lastmoddt")).getTime();
                return d2 == d1 ? 0 : d2 > d1 ? 1 : -1;
            }
        });
        return Collection;
    }
};

model = Alloy.M("todo", exports.definition, []);

collection = Alloy.C("todo", exports.definition, model);

exports.Model = model;

exports.Collection = collection;