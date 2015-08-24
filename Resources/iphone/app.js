var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Alloy.Collections.todo = Alloy.createCollection("todo");

Ti.API.debug("todo: " + JSON.stringify(Alloy.Collections.todo));

Ti.API.debug("current locale: " + JSON.stringify(Ti.Locale.currentLocale));

Alloy.createController("index");