sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "pl/capgemini/damjur/pwatesteditable/model/models",
    "pl/capgemini/damjur/pwatesteditable/model/IndexDb"
],
    function (UIComponent, Device, models, IndexDB) {
        "use strict";

        //TODO: Uncomment
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register("/serviceworker.js")
                .then(() => console.log('Service Worker Registered'))
                .catch(err => console.log(err));
        }

        return UIComponent.extend("pl.capgemini.damjur.pwatesteditable.Component", {
            metadata: {
                manifest: "json"
            },
            _indexDB: new IndexDB(this),

            getIndexedDB: function () {
                return this._indexDB;
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");

                var sServiceUrl = "/v2/(S(a5zsvzgiix23xhmah1xvd4yz))/OData/OData.svc";
                models.createServiceModel(sServiceUrl, null, this);
            }


        });
    }
);