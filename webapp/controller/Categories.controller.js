sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("pl.capgemini.damjur.pwatesteditable.controller.Categories", {
            onInit: function () {

            },
            toCategory:function(oEvent){
                this.getOwnerComponent().getRouter().navTo("Category",{
                    "id":oEvent.getSource().getBindingContext().getObject().ID
                });
            }
        });
    });
