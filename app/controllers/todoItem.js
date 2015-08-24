var args = arguments[0] || {},
	itemId = args.itemId;
	
function instanceViewFilter(collection) {
	var result = [collection.get(itemId)];
	return result;
}

function doTransform(model) {
	var result = model.toJSON();
	result.readabledate = new Date(result.lastmoddt).toLocaleString();
	result.statusLabel = result.completed ? 'item_complete' : 'item_pending';
	result.pendingOpacity = result.completed ? 0.0 : 1.0;
	result.completedOpacity = 1.0 - result.pendingOpacity;
	return result;
}

function toggleStatus(evt) {
	Alloy.Collections.todo.toggle(itemId);
	updateUi();
}

function updateContent(evt) {
	Alloy.Collections.todo.updateContent(itemId, evt.value);
}

function refresh() {
	Alloy.Collections.todo.fetch({success:updateUi});
}
refresh();
