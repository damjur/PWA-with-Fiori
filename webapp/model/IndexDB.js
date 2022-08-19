sap.ui.define([
    "sap/ui/model/json/JSONModel"
], function (Model) {
    "use strict";

    var _instance = void 0;
    var version = 0;

    var IndexedDb = Model.extend("pl.capgemini.damjur.pwatesteditable.model.IndexedDb", {

        /**
         *@description Constructor
         *@memberOf IndexedDb
         *@param {object} oComponent - Owner Component
         */
        constructor: function (oComponent) {
            if (window.indexedDB === null) {
                console.error("Offline store not supported!");
                return null;
            }

            this._oComponent = oComponent;
            Model.prototype.constructor.call(this, {
                "_meta": []
            });
            var request = indexedDB.open("localStorage");
            request.onsuccess = function (oEvent) {
                IndexedDb._db = oEvent.target.result;
                version = IndexedDb._db.version;
                IndexedDb._db.close();
            };
            IndexedDb._instance = this;
        },
        /**
 *@description loads data from indexeddb.
 * Adds attribute "_origin": "indexeddb" to indexeddb
 *@memberOf IndexedDb
 *@param {String} sTable - Name of table that is read
 *@param {boolean} bIncludeRemove - in cludes entries with property _http === "remove"
 *@returns {array} - read table with extra attribute "_origin": "indexeddb"
 */
        getTable: function (sTable, bIncludeRemove) {
            var that = this;
            return new Promise(function (resolve, reject) {
                var request = indexedDB.open("localStorage", version);

                request.onsuccess = function (oEvent) {
                    IndexedDb._db = oEvent.target.result;
                    if (!that._tableAvailable(sTable)) {
                        IndexedDb._db.close();
                        return resolve([]);
                    }
                    var objectStore = IndexedDb._db.transaction([sTable], "readwrite").objectStore(sTable);
                    var request = objectStore.openCursor();
                    var aTable = [];

                    request.onsuccess = function (event) {
                        var cursor = event.target.result;
                        if (cursor) {
                            cursor.value._origin = "indexeddb";
                            if (bIncludeRemove || cursor.value._http === 'create') aTable.push($.extend(cursor.value, cursor.value));
                            cursor.continue();
                        }
                        else {
                            IndexedDb._db.close();
                            resolve(aTable);
                        }
                    };
                };
            });
        },
        _tableAvailable:function(sTable){
            return IndexedDb._db.objectStoreNames.contains(sTable);
        }
    });

    return IndexedDb;
});