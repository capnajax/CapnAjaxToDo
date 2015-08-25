var args = arguments[0] || {},
	todo = Alloy.Collections.todo;

function transform(collection) {
	var result = _.map(collection, function(model) {

		model = model.toJSON();
		var content = {text: model.content};
		model.thumbnail || (content.right = 10);

		return {
			template: "todoItem",
			properties: {
				itemId: model.id,
				height: 50,
				searchableText: model.content
			},
			pending:   {opacity: model.completed ? 0.0 : 1.0},
			completed: {opacity: model.completed ? 1.0 : 0.0},
			image: {image: model.thumbnail},
			content: content
		};
	});
	return result;
}

function newTodo(evt) {
	var newModel = Alloy.createModel("todo");
	newModel.save();
	Alloy.Collections.todo.fetch();
	openDetail(newModel.id);
}

function openDetail(id) {
	var editItemScreen = Alloy.createController('todoItem', {itemId:id});
	editItemScreen.getView().addEventListener('close', function() {
		refreshData();
	});
	Alloy.Globals.navigation.advance(editItemScreen.getView());
}

function refreshData() {
	todo.fetch();
	$.pendingTodos.setItems(transform(todo.pending()));
	$.completedTodos.setItems(transform(todo.completed()));
}

// startup
(function() {
	$.todoListListView.addEventListener('itemclick', function(evt) {
		if(_.contains(["completed","pending","status"],evt.bindId)) {
			// put up waiting icon
			var item = evt.section.getItemAt(evt.itemIndex);
			item.completed.opacity = 1.0 - item.completed.opacity;
			item.pending.opacity = 1.0 - item.pending.opacity;
			evt.section.updateItemAt(evt.itemIndex, item);
			// toggle status
			todo.toggle(evt.itemId, {success:refreshData});
			// delay the move to the other list for a few moments so it doesn't feel weird
			setTimeout(refreshData, 500);
		} else {
			openDetail(evt.itemId);
		}
	});
	
	refreshData();
})();
