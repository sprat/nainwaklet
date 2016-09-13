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

        log('Sending a ring update to ' + url);

        xhr(options, function (error, response) {
            if (response.statusCode === 200) {
                log('OK');
            } else {
                log('FAIL (' + response.statusCode + ')');
            }
            // TODO: check response status: auth errors
            lastUpdates[pageId] = date;
        });
    }

    return {
        send: send
    };
}

module.exports = Updater;