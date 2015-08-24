var args = arguments[0] || {},
	todo = Alloy.Collections.todo,
	fa = require('FontAwesome');

var icons = {
	completed: String.fromCharCode(fa.charcode['fa-check-circle-o']),
	pending: String.fromCharCode(fa.charcode['fa-circle-o']),
	updating: String.fromCharCode(fa.charcode['fa-clock-o'])
};

function transform(collection) {
	var result = _.map(collection, function(model) {
		model = model.toJSON();
		return {
			template: "todoItem",
			properties: {
				itemId: model.id,
				height: 50
			},
			completed: {
				text: model.completed ? icons.completed : icons.pending,
				font: { fontFamily: fa.fontfamily, fontSize: 18}},
			content: {text: model.content}
		};
	});
	Ti.API.debug("transform returns " + JSON.stringify(result));
	return result;
}

function toggleStatus(evt) {
};

var db=Ti.Database.open("_alloy_");
db.execute("INSERT INTO todo (completed, content) VALUES (0, 'test content');");
Ti.API.debug(db.execute("select * from todo").rowCount);
db.close();
var db=Ti.Database.open("_alloy_");
Ti.API.debug(db.execute("select * from todo").rowCount);
db.close();

function refreshData() {
	todo.fetch();
	$.pendingTodos.setItems(transform(todo.pending()));
	$.completedTodos.setItems(transform(todo.completed()));
}

// startup
(function() {
	$.todoListListView.addEventListener('itemclick', function(evt) {
		if(evt.bindId === "completed") {
			Ti.API.debug("toggleStatus on id=" + evt.itemId);
			// put up waiting icon
			var item = evt.section.getItemAt(evt.itemIndex);
			item.completed.text = icons.updating;
			evt.section.updateItemAt(evt.itemIndex, item);
			// toggle status
			todo.toggle(evt.itemId);
			// delay the move to the other list for a few moments so it doesn't feel weird
			setTimeout(refreshData, 500);
		} else {
			Ti.API.debug("itemClick on id " + evt.itemId);
			var editItemScreen = Alloy.createController('todoItem', {itemId:evt.itemId});
			editItemScreen.getView().addEventListener('close', refreshData);
			Alloy.Globals.navigation.advance(editItemScreen.getView());
		}
	});
	
	refreshData();
})();
