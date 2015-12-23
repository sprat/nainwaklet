define(['./pages', 'utils/htmldocument', 'utils/ajax', 'utils/log'], function (pages, htmldocument, ajax, log) {
    'use strict';

    /* Spy class */
    function Spy(conf) {
        var infoWindow = window.frames.info,
            frame = infoWindow ? infoWindow.frameElement : null,
            isEnabled = false,
            user = conf.user,
            ringUpdateUrl = conf.ringUpdateUrl;

        //IDS = url.parseQueryParams(frame.location).IDS,

        if (!infoWindow) {
            return;
        }

        function onLoad() {
            var contentWindow = frame.contentWindow,
                doc = contentWindow.document,
                location = contentWindow.location,
                url = location.origin + location.pathname,
                page = pages.byUrl(url);

            log('Navigation to ' + url);
            if (page) {
                page.process(doc);
                sendRingUpdate(ringUpdateUrl, doc, user);
            }
        }

        function enable(value) {
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
        }

        function sendRingUpdate(ringUpdateUrl, doc, user) {
            var date = Date.now(),  // unix timestamp
                canSend = ringUpdateUrl && user && user.password,
                options = { contentType: 'application/json' },
                data;

            if (!canSend) {
                return;  // don't do anything
            }

            data = JSON.stringify({
                user: user.name,
                pass: user.password,
                url: doc.location.href,
                content: htmldocument.serialize(doc),
                date: date
            });

            log('Posting page source code to ' + ringUpdateUrl);
            ajax.post(ringUpdateUrl, data, options, function (response) {
                log('Response received:');
                log(response);
            });
        }

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
