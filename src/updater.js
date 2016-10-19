var xhr = require('xhr');
var serializeHTML = require('print-html');
var log = require('./log');

/* Updater class */
function Updater(url, storage, throttleDelay) {
    throttleDelay = throttleDelay || 60;

    // we don't know if authorization is needed yet, so we assume it's not needed
    // until we receive an authorization error
    var needAuthorization = false;

    // store the last update dates for each page
    var lastUpdates = {};

    function getAuthorization() {
        return storage.get('authorization');
    }

    function isAllowed(authorization) {
        return !needAuthorization || authorization;
    }

    function send(page, doc, date, analysis) {
        var pageId = page.url;
        var lastUpdate = lastUpdates[pageId] || 0;
        var elapsed = (date - lastUpdate) / 1000;
        var authorization = getAuthorization();

        if (elapsed < throttleDelay) {
            log('No update: rate limited');
            return;
        }

        if (!isAllowed(authorization)) {
            log('No update: authorization needed');
            return;
        }

        var data = {
            url: page.url,
            type: page.type,
            raw: serializeHTML(doc),
            content: analysis,
            date: date
        };

        var options = {
            url: url,
            method: 'POST',
            headers: {
                // This header is set to tell the server that we are calling it
                // from a XHR request. In that case, it must not send a
                // "WWW-Authenticate: Basic" header back to us since we can't
                // handle it properly cross-browser.
                'X-Requested-With': 'XMLHttpRequest'
            },
            json: data
        };

        if (authorization) {
            options.headers['Authorization'] = authorization;
        }

        log('Sending an update to ' + url);

        xhr(options, function (error, response) {
            var status = response.statusCode;
            var isOk = (status >= 200 && status < 300);
            var label = isOk ? 'OK' : 'FAIL';
            log(label + ' (' + status + ')');

            if (status === 401) {  // TODO: what about 403?
                needAuthorization = true;
                storage.set('authorization', undefined);
                return;
            }

            // TODO: check response status: rate-limit, etc.
            lastUpdates[pageId] = date;
        });
    }

    function render(h) {
        var authorization = getAuthorization();
        var enabledWord = isAllowed(authorization) ? 'activée' : 'désactivée';
        return h('p', 'Mise à jour ' + enabledWord);
    }

    return {
        send: send,
        render: render
    };
}

module.exports = Updater;
