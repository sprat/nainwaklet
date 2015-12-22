define(['./pages', 'utils/log'], function (pages, log) {
    'use strict';

    /* Spy class */
    function Spy(user) {
        var infoWindow = window.frames.info;

        if (!infoWindow) {
            return;
        }

        //IDS = url.parseQueryParams(frame.location).IDS,
        var frame = infoWindow.frameElement,
            onLoad = function () {
                var contentWindow = frame.contentWindow,
                    doc = contentWindow.document,
                    location = contentWindow.location,
                    url = location.origin + location.pathname,
                    page = pages.byUrl(url);

                log('Navigation to ' + url);
                if (page) {
                    page.process(doc, user);
                }
            },
            isEnabled = false,
            enable = function (value) {
                var oldEnabled = isEnabled;

                // update the status (and convert to boolean, just in case)
                isEnabled = !!value;

                if (oldEnabled === isEnabled) {  // nothing to do
                    return;
                }

                // register or unregister the load event handler
                if (isEnabled) {
                    frame.addEventListener('load', onLoad, false);
                } else {
                    frame.removeEventListener('load', onLoad, false);
                }
            };

        // start enabled
        enable(true);

        return Object.freeze({
            get enabled() {
                return isEnabled;
            },
            set enabled(value) {
                enable(value);
            }
        });
    }

    return Spy;
});
