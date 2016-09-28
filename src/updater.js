var xhr = require('xhr');
var serializeHTML = require('print-html');
var log = require('./log');

/* Updater class */
function Updater(url, throttleDelay) {
    if (!url) {
        throw new Error('url is mandatory');
    }

    throttleDelay = throttleDelay || 60;

    var lastUpdates = {};

    function send(page, doc, date, analysis) {
        var pageId = page.url;
        var isAuthenticated = true;  // TODO: authenticate
        var lastUpdate = lastUpdates[pageId] || 0;
        var elapsed = (date - lastUpdate) / 1000;

        if (!isAuthenticated || elapsed < throttleDelay) {
            return;  // don't do anything
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
            json: data
        };

        log('Sending an update to ' + url);

        xhr(options, function (error, response) {
            var status = response.statusCode;
            var isOk = (status >= 200 && status < 300);
            var label = isOk ? 'OK' : 'FAIL';
            log(label + ' (' + status + ')');

            // TODO: check response status: auth errors, rate-limit, etc.
            lastUpdates[pageId] = date;
        });
    }

    return {
        send: send
    };
}

module.exports = Updater;