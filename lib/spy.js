var pages = require('./pages'),
    htmldocument = require('./utils/htmldocument'),
    ajax = require('./utils/ajax'),
    log = require('./utils/log');


/* Spy class */
function Spy(conf) {
    var infoWindow = window.frames.info,
        infoFrame = infoWindow ? infoWindow.frameElement : null,
        isEnabled = false,
        user = conf.user,
        ringUpdateUrl = conf.ringUpdateUrl;

    //IDS = url.parseQueryParams(infoFrame.location).IDS,

    if (!infoWindow || !infoFrame) {
        return;
    }

    function onLoad() {
        var doc = infoWindow.document,
            location = infoWindow.location,
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
            infoFrame.addEventListener('load', onLoad, false);
        } else {
            infoFrame.removeEventListener('load', onLoad, false);
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

        log('Posting page source to ' + ringUpdateUrl);
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


module.exports = Spy;
