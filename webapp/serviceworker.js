const cache_name = "pwa-fiori-example";
const urlsToCache = [
    "/Component.js",
"/controller/App.controller.js",
"/controller/Categories.controller.js",
"/css/style.css",
"/i18n/i18n.properties",
"/index.html",
"/manifest.json",
"/manifest.json?sap-language=EN",
"/model/IndexDb.js",
"/model/models.js",
"/model/ODataModelWithCache.js",
"/resources/sap-ui-core.js",
"/resources/sap/base/strings/camelize.js",
"/resources/sap/f/library-preload.js",
"/resources/sap/f/library.js",
"/resources/sap/f/messagebundle_en.properties",
"/resources/sap/f/messagebundle.properties",
"/resources/sap/f/themes/sap_horizon/library.css",
"/resources/sap/fe/navigation/library.js",
"/resources/sap/fe/placeholder/library-preload.js",
"/resources/sap/fe/placeholder/library.js",
"/resources/sap/fe/placeholder/themes/sap_horizon/library.css",
"/resources/sap/m/AvatarColor.js",
"/resources/sap/m/AvatarImageFitType.js",
"/resources/sap/m/AvatarShape.js",
"/resources/sap/m/AvatarSize.js",
"/resources/sap/m/AvatarType.js",
"/resources/sap/m/IllustratedMessageSize.js",
"/resources/sap/m/IllustratedMessageType.js",
"/resources/sap/m/library-preload.js",
"/resources/sap/m/library.js",
"/resources/sap/m/messagebundle_en.properties",
"/resources/sap/m/messagebundle.properties",
"/resources/sap/m/Support.js",
"/resources/sap/m/themes/sap_horizon/library.css",
"/resources/sap/m/upload/UploaderHttpRequestMethod.js",
"/resources/sap/suite/ui/generic/template/library-preload.js",
"/resources/sap/suite/ui/generic/template/library.js",
"/resources/sap/suite/ui/generic/template/themes/sap_horizon/library.css",
"/resources/sap/suite/ui/microchart/library-preload.js",
"/resources/sap/suite/ui/microchart/messagebundle_en.properties",
"/resources/sap/suite/ui/microchart/messagebundle.properties",
"/resources/sap/suite/ui/microchart/themes/sap_horizon/library.css",
"/resources/sap/ui/comp/library-preload.js",
"/resources/sap/ui/comp/library.js",
"/resources/sap/ui/comp/messagebundle_en.properties",
"/resources/sap/ui/comp/messagebundle.properties",
"/resources/sap/ui/comp/themes/sap_horizon/library.css",
"/resources/sap/ui/core/BlockLayerUtils.js",
"/resources/sap/ui/core/BusyIndicatorUtils.js",
"/resources/sap/ui/core/ComponentContainer.js",
"/resources/sap/ui/core/ComponentContainerRenderer.js",
"/resources/sap/ui/core/ComponentSupport.js",
"/resources/sap/ui/core/Control.js",
"/resources/sap/ui/core/CustomStyleClassSupport.js",
"/resources/sap/ui/core/date/_Calendars.js",
"/resources/sap/ui/core/date/Gregorian.js",
"/resources/sap/ui/core/date/UniversalDate.js",
"/resources/sap/ui/core/library-preload.js",
"/resources/sap/ui/core/library.js",
"/resources/sap/ui/core/messagebundle_en.properties",
"/resources/sap/ui/core/messagebundle.properties",
"/resources/sap/ui/core/themes/sap_horizon/fonts/72-Bold.woff2",
"/resources/sap/ui/core/themes/sap_horizon/fonts/72-Regular.woff2",
"/resources/sap/ui/core/themes/sap_horizon/library.css",
"/resources/sap/ui/fl/initial/_internal/connectors/LrepConnector.js",
"/resources/sap/ui/fl/initial/_internal/connectors/Utils.js",
"/resources/sap/ui/fl/library-preload-apply.js",
"/resources/sap/ui/fl/library-preload.js",
"/resources/sap/ui/fl/messagebundle_en.properties",
"/resources/sap/ui/fl/messagebundle.properties",
"/resources/sap/ui/fl/themes/sap_horizon/library.css",
"/resources/sap/ui/fl/util/IFrame.flexibility.js",
"/resources/sap/ui/generic/app/library-preload.js",
"/resources/sap/ui/generic/app/library.js",
"/resources/sap/ui/generic/app/messagebundle_en.properties",
"/resources/sap/ui/generic/app/messagebundle.properties",
"/resources/sap/ui/layout/library-preload.js",
"/resources/sap/ui/layout/library.js",
"/resources/sap/ui/layout/messagebundle_en.properties",
"/resources/sap/ui/layout/messagebundle.properties",
"/resources/sap/ui/layout/themes/sap_horizon/library.css",
"/resources/sap/ui/table/library-preload.js",
"/resources/sap/ui/table/library.js",
"/resources/sap/ui/table/messagebundle_en.properties",
"/resources/sap/ui/table/messagebundle.properties",
"/resources/sap/ui/table/themes/sap_horizon/library.css",
"/resources/sap/ui/thirdparty/datajs.js",
"/resources/sap/ui/unified/ColorPickerDisplayMode.js",
"/resources/sap/ui/unified/FileUploaderHttpRequestMethod.js",
"/resources/sap/ui/unified/library-preload.js",
"/resources/sap/ui/unified/library.js",
"/resources/sap/ui/unified/messagebundle_en.properties",
"/resources/sap/ui/unified/messagebundle.properties",
"/resources/sap/ui/unified/themes/sap_horizon/library.css",
"/resources/sap/ushell/library-preload.js",
"/resources/sap/ushell/library.js",
"/resources/sap/ushell/themes/sap_horizon/library.css",
"/utils/locate-reuse-libs.js",
"/view/App.view.xml",
"/view/Categories.view.xml"
];
//TODO: the remaining files

async function persistData() {
    if (navigator.storage && navigator.storage.persist) {
        const result = await navigator.storage.persist();
        console.log(`Data persisted: ${result}`);
    }
}

function catchError(promise) {
    return promise.catch(err => console.log(err));
}

// This code executes in its own worker or thread
self.addEventListener("install", event => {
    console.log("Service Worker Installed");
    event.waitUntil(
        catchError(caches.open(cache_name)
            .then(cache => cache.addAll(urlsToCache)))
    );
});

self.addEventListener("activate", event => {
    console.log("Service Worker Activated");
    event.waitUntil(
		caches.keys().then(function (keyList) {
			return Promise.all(keyList.map(function (key) {
				if (key !== cache_name) {
					return caches.delete(key);
				}
			}));
		})
	);
});

self.addEventListener("fetch", event => {
    //TODO: OData requests should be cached differently?
    var request = event.request;
    if (request.method === 'GET' && !request.url.startsWith("chrome-extension://")) {
        event.respondWith(
            caches.match(request).then(cachedResponse => {
                const networkFetch = catchError(fetch(request).then(response => {
                    // update the cache with a clone of the network response
                    return response.ok && response.type !== 'opaque' ? catchError(caches.open(cache_name).then(cache => {
                        cache.put(request, response.clone());
                    })) : response;
                }));
                // prioritize cached response over network
                return cachedResponse || networkFetch;
            }));
    }
});