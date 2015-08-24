
function login(e) {

	var nav = Alloy.createWidget("com.capnajax.navigation");
	nav.init({
		drawerContent: null
	});

	var firstController = Alloy.createController("todoList");
	nav.advance(firstController.getView());
	nav.getView().open();

	Alloy.Globals.navigation = nav;

	$.index.close();
}

if (OS_ANDROID) {
	$.index.addEventListener('open', function() {
		$.index.activity.actionBar.hide();
	});

	$.index.addEventListener('close', function() {
		Titanium.Android.currentActivity.finish();
	});
}

$.index.open();
