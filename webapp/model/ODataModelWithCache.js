sap.ui.define([
    "sap/ui/model/odata/v2/ODataModel"
], function (ODataModel) {
    "use strict";

    return ODataModel.extend("pl.capgemini.damjur.pwatesteditable.model.ODataModelWithCache", {
        _oComponent: null,

        constructor: function (sServiceURL, mParameters, oComponent) {
            this._oComponent = oComponent;
            ODataModel.prototype.constructor.call(this, sServiceURL, mParameters);
        },
        /**
*@description extended READ
* on read (error and success) the local INDEXEDDB is also read with the supplied sPath from the original
* OData Call. Merges data from indexed to to "Results"
*@memberOf oData
*@param {String} sPath - A string containing the path to the data which should be retrieved.
* The path is concatenated to the service URL which was specified in the model constructor. Eg. '/CustomerSet'
*@param {Object} mParameters - Optional parameter map, see API
*/
        read: function (sPath, mParameters) {
            var that = this;
            mParameters.success = (function (success) {
                return function (data, oData) {
                    that._readSuccessCallback(data, oData, this)
                        .then(function (localData) {
                            if (data.result) {
                                data.result ? data.result = data.result.concat(localData.data) : localData.data ? data.result = localData.data : '';    
                            // } else {
                            //     data ? data = data + localData.data : localData.data ? data = localData.data : '';
                            }
                            success(data, oData);
                        });
                }.bind(sPath);
            }.bind(sPath))(mParameters.success);

            mParameters.error = (function (error) {
                return function (data) {
                    that._readErrorCallback(data, this.path, this.params)
                        .then(function (localData) {
                            if (localData.data) localData.params.success(data);
                            error(data);
                        });
                }.bind({
                    path: sPath,
                    params: mParameters
                });
            }.bind(sPath))(mParameters.error);

            ODataModel.prototype.read.call(this, sPath, mParameters)

        },

        /**
         *@description Extended READ Success function. Tries to read path from BE AND IndexedDB
         *@memberOf oData
         *@param {Object} data - Data resulting from call
         *@param {Object} oData - Overhead Data
         *@param {String} sPath - called Path
         */
        _readSuccessCallback: function (data, oData, sPath) {
            console.log("Server READ SUCCESS: %s ", sPath);
            return this._loadFromIndexedDB(sPath, {})
        },

        /**
         *@description loads a Table from the indexed DB
         *@param {String} sPath - called Path
         *@param {Object} oParams - success / error
         *@return {promise}
         */
        _loadFromIndexedDB: function (sPath, oParams) {
            var that = this;
            return new Promise(function (resolve) {
                try {
                    var oDB = that._oComponent._indexDB;//getIndexedDb();
                    oDB.getTable(sPath)
                        .then(function (data) {
                            resolve({
                                data: data,
                                params: oParams
                            })
                        });   
                } catch (error) {
                    debugger;
                }
            })
        }
    });
});