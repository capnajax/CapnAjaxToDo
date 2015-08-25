var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            id: "INTEGER PRIMARY KEY AUTOINCREMENT",
            completed: "INTEGER",
            lastmoddt: "TEXT",
            image: "BLOB",
            thumbnail: "BLOB",
            content: "TEXT"
        },
        defaults: {
            completed: 0,
            image: null,
            content: "",
            lastmoddt: new Date().toDateString()
        },
        adapter: {
            type: "sql",
            collection_name: "todo",
            idAttribute: "id"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {
            updated: function(options) {
                this.save({
                    lastmoddt: new Date().toString()
                }, _.extend(options || {}, {
                    silent: true
                }));
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
            toggle: function(id, options) {
                var model = this.get(id);
                model.save({
                    completed: model.get("completed") ? 0 : 1
                });
                model.updated(options);
            },
            deleteItem: function(id, options) {
                var model = this.get(id);
                model.save({
                    completed: -1
                });
                model.updated(options);
                setTimeout(_.bind(function() {
                    this.remove(model, {
                        silent: true
                    });
                }, this), 5e3);
            },
            updateContent: function(id, content, options) {
                var model = this.get(id);
                model.save({
                    content: content
                }, {
                    silent: true
                });
                model.updated(options);
            },
            updatePhoto: function(id, image, options) {
                var resizeHeight, resizeWidth, model = this.get(id), saveImage = null, thumbnail = null;
                if (image) {
                    resizeHeight = image.width > image.height ? 300 : 300 * image.height / image.width;
                    resizeWidth = image.height > image.width ? 300 : 300 * image.width / image.height;
                    saveImage = image && image.imageAsResized(resizeWidth, resizeHeight).imageAsCropped({
                        width: 300,
                        height: 300
                    });
                    thumbnail = saveImage && saveImage.imageAsThumbnail(30, 0, 0);
                }
                model.save({
                    image: saveImage,
                    thumbnail: thumbnail
                }, {
                    silent: true
                });
                model.updated(options);
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