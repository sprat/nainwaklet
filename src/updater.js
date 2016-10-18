var xhr = require('xhr');
var serializeHTML = require('print-html');
var log = require('./log');

/* Updater class */
function Updater(url, storage, throttleDelay) {
    throttleDelay = throttleDelay || 60;

    var needAuthorization = false;
    var lastUpdates = {};

    function send(page, doc, date, analysis) {
        var pageId = page.url;
        var lastUpdate = lastUpdates[pageId] || 0;
        var elapsed = (date - lastUpdate) / 1000;
        var authorization = storage.get('authorization');

        if (elapsed < throttleDelay) {
            log('No update: not enough delay');
            return;  // try later
        }

        if (needAuthorization && !authorization) {
            log('No update: authorization missing');
            return;  // credentials needed
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

    return {
        send: send
    };
}

module.exports = Updater;
