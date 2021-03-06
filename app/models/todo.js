	
exports.definition = {
	config: {
		columns: {
			"id": "INTEGER PRIMARY KEY AUTOINCREMENT",
		    "completed": "INTEGER",
		    "lastmoddt": "TEXT",
		    "image": "BLOB",
		    "thumbnail": "BLOB",
		    "content": "TEXT"
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
			// extended functions and properties go here

			updated: function(options) {
				this.save({lastmoddt:new Date().toString()}, _.extend(options||{},{silent:true}));
			}

		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here

			// For Backbone v1.1.2, uncomment the following to override the
			// fetch method to account for a breaking change in Backbone.
			
			// fetch: function(options) {
				// options = options ? _.clone(options) : {};
				// options.reset = true;
				// return Backbone.Collection.prototype.fetch.call(this, options);
			// }

			pending: function(options) {
				return this.where({completed: 0});
			},

			completed: function(options) {
				return this.where({completed: 1});
			},
			
			toggle: function(id, options) {
				var model = this.get(id);
				model.save({completed: model.get("completed")?0:1});
				model.updated(options);
			},
			
			deleteItem: function(id, options) {
				var model = this.get(id);
				model.save({completed: -1});
				model.updated(options);
				setTimeout(_.bind(function() {
					this.remove(model, {silent: true});
				}, this), 5000);
			},
			
			updateContent: function(id, content, options) {
				var model = this.get(id);
				model.save({content: content}, {silent: true});
				model.updated(options);
			},
			
			updatePhoto: function(id, image, options) {
				var model = this.get(id),
					resizeHeight, resizeWidth,
					saveImage = null,
					thumbnail = null;
				
				if(image) {
					resizeHeight = image.width > image.height ? 300 : image.height * 300 / image.width;
					resizeWidth = image.height > image.width ? 300 : image.width * 300 / image.height;
					saveImage = image && image.imageAsResized(resizeWidth, resizeHeight)
											  .imageAsCropped({width:300, height:300});
					thumbnail = saveImage && saveImage.imageAsThumbnail(30, 0, 0);
				}
				
				model.save({image: saveImage, thumbnail: thumbnail}, {silent: true});
				model.updated(options);
			},
			
			comparator: function(t1, t2) {
				var d1 = new Date(t1.get('lastmoddt')).getTime(),
					d2 = new Date(t2.get('lastmoddt')).getTime();
				return d2 == d1 ? 0 : ( d2 > d1 ? 1 : -1);
			}
			
		});

		return Collection;
	}
};
