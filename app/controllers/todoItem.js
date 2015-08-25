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

function findImageContainer(startingPoint) {
	if(startingPoint.roleid === "imageContainer") {
		return startingPoint;
	} else if(startingPoint.parent) {
		return findImageContainer(startingPoint.parent);
	}
}

function findImageOptionsContainer(parent) {
	if(parent) {
		return _.findWhere(parent.children, {roleid:"imageOptionsContainer"});
	}
}

function findUpdateImageLabel(parent) {
	if(parent) {
		return _.findWhere(parent.children, {roleid:"updateImageButton"});
	}
}

function updatePhoto(evt) {
	Ti.API.debug(JSON.stringify(evt.source));
	try {
		var parent = findImageContainer(evt.source);
		findImageOptionsContainer(parent).visible = true;
		findUpdateImageLabel(parent).visible = false;
	} catch(e) {
		Ti.API.warn("todoItem::updatePhoto could not find an element or container, e == " + JSON.stringify(e));
	}
}
function updatePhotoCancel(evt) {
	try {
		var parent = findImageContainer(evt.source);
		findImageOptionsContainer(parent).visible = false;
		findUpdateImageLabel(parent).visible = true;
		evt.cancelBubble = true;
	} catch(e) {
		Ti.API.warn("todoItem::updatePhotoCancel could not find an element or container, e == " + JSON.stringify(e));
	}
}

function updatePhotoCamera() {
	Ti.Media.showCamera({
		success: function(evt) {
			if(evt.mediaType === Ti.Media.MEDIA_TYPE_PHOTO) {
				Alloy.Collections.todo.updatePhoto(itemId, evt.media, {success:refresh});
			}	
		}
	});
}

function updatePhotoGallery() {
	Ti.Media.openPhotoGallery({
		mediaTypes: Ti.Media.MEDIA_TYPE_PHOTO,
		success: function(evt) {
			if(evt.mediaType === Ti.Media.MEDIA_TYPE_PHOTO) {
				Alloy.Collections.todo.updatePhoto(itemId, evt.media, {success:refresh});
			}	
		}
	});
}

function updatePhotoDelete() {
	Alloy.Collections.todo.updatePhoto(itemId, null, {success:refresh});
}

function refresh() {
	Alloy.Collections.todo.fetch({success:updateUi});
}
refresh();

