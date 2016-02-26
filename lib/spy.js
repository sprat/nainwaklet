var Ring = require('./ring'),
    //pages = require('./pages'),
    log = require('./log');

/* Spy class */
function Spy(conf) {
    var infoWindow = window.frames.info,
        infoFrame = infoWindow ? infoWindow.frameElement : null,
        isEnabled = false,
        ring = Ring(conf);

    //IDS = url.parseQueryParams(infoFrame.location).IDS,

    if (!infoWindow || !infoFrame) {
        return;
    }

    function onLoad() {
        var doc = infoWindow.document,
            url = infoWindow.location.href;

        log('Navigation to ' + url);

        /*
        var page = pages.byUrl(url)
        if (page && page.analyze) {
            log('Analyzing ' + page.name);
            log(page.analyze(doc));
        }
        */

        if (ring) {
            ring.sendUpdate(doc);
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
            infoFrame.addEventListener('load', onLoad, false);
        } else {
            infoFrame.removeEventListener('load', onLoad, false);
        }
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

module.exports = Spy;
