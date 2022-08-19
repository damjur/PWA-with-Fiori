sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "pl/capgemini/damjur/pwatesteditable/model/ODataModelWithCache",
    "sap/ui/Device"
],
    function (JSONModel, OData, Device) {
        "use strict";

        return {
            createDeviceModel: function () {
                var oModel = new JSONModel(Device);
                oModel.setDefaultBindingMode("OneWay");
                return oModel;
            },
            createServiceModel: function (sServiceUrl, mParameters, oComponent) {
                return new Promise(function (resolve, reject) {
                    try {
                        var oServiceModel = new OData(sServiceUrl, null, oComponent);
                        oComponent.setModel(oServiceModel);
                        oServiceModel.setUseBatch(false);
                        oServiceModel.setDefaultBindingMode("TwoWay");

                        oServiceModel.metadataLoaded()
                            .then(function () {
                                resolve(oServiceModel);
                            });
                    } catch (err) {
                        reject(err);
                    }
                });
            }
        };
    }
);