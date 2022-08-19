/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"plcapgeminidamjur/pwa-test-editable/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
