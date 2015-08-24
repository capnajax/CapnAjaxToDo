var fa = require('FontAwesome');
	
exports.definition = {
	config: {
		columns: {
			"id": "INTEGER PRIMARY KEY AUTOINCREMENT",
		    "completed": "INTEGER",
		    "lastmoddt": "TEXT",
		    "image": "BLOB",
		    "content": "TEXT"
		},
		defaults: {
			completed: 0,
			image: null,
			lastmoddt: '0'
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

			updated: function() {
				this.save({lastmoddt:new Date().toString()}, {silent:true});
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
			
			toggle: function(id) {
				var model = this.get(id);
				model.save({completed: model.get("completed")?0:1});
				model.updated();
			},
			
			updateContent: function(id, content) {
				var model = this.get(id);
				model.save({content: content}, {silent: true});
				model.updated();
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
