sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("pl.capgemini.damjur.pwatesteditable.controller.Product", {
            onInit: function () {
                this.getOwnerComponent().getRouter().getRoute("Product").attachPatternMatched(this._navFrom, this);
            },
            _navFrom: function (oEvent) {
                this.getView().bindElement(`/Products(${oEvent.getParameter("arguments").id})`);
            },
            onSave: function () {
                var oModel = this.getView().getModel();
                oModel.submitChanges({
                    success: (x) => { sap.m.MessageToast.show(x.__batchResponses.map((x) => x.__changeResponses).reduce((a, b) => a.concat(b), []).filter(x => x).map(x => x.message).reduce((a, b) => `${a} ${b}`)) },
                    error: () => sap.m.MessageToast.show("Error")
                });
            }
        });
    });
