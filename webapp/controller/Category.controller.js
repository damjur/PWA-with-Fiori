sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("pl.capgemini.damjur.pwatesteditable.controller.Category", {
            onInit: function () {
                this.getOwnerComponent().getRouter().getRoute("Category").attachPatternMatched(this._navFrom,this);
            },
            _navFrom:function(oEvent){
                this.getView().bindElement(`/Categories(${oEvent.getParameter("arguments").id})`);
            },
            toDetails:function(oEvent){
                this.getOwnerComponent().getRouter().navTo("Product",{
                    "id":oEvent.getSource().getBindingContext().getObject().ID
                });
            }
        });
    });
