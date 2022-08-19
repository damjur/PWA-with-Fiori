/*global QUnit*/

sap.ui.define([
	"plcapgeminidamjur/pwa-test-editable/controller/Categories.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Categories Controller");

	QUnit.test("I should test the Categories controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
