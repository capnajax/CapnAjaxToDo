var args = arguments[0] || {},
	fa = require('FontAwesome'),
	itemId = args.itemId;
	
var contentChanged = false;

function instanceViewFilter(collection) {
	var result = collection.where({id:itemId});
	Ti.API.debug("todo.result on itemId " +itemId+ " == " + JSON.stringify(result));
	return result;
}

function doTransform(model) {
	var result = model.toJSON();
	result.readabledate = new Date(result.lastmoddt).toLocaleString();
	result.statusIcon = String.fromCharCode(
			fa.charcode[result.completed?'fa-check-circle-o':'fa-circle-o']
		);
	result.statusLabel = result.completed ? 'item_complete' : 'item_pending';
	Ti.API.debug("todo.transform, result: " + JSON.stringify(result));
	return result;
}

function toggleStatus(evt) {
	Alloy.Collections.todo.toggle(itemId);
	updateUi();
}

function updateContent(evt) {
	Alloy.Collections.todo.updateContent(itemId, evt.value);
}

updateUi();
