var xhr = require('xhr'),
    serializeHTML = require('print-html'),
    log = require('./log');

/* Updater class */
function Updater(url, user, pages, throttleDelay) {
    if (!url || !user) {
        throw new Error('url and user parameters are mandatory');
    }

    throttleDelay = throttleDelay || 60;

    var lastUpdates = {};

    function send(page, doc, date, analysis) {
        var pageId = page.url,
            isAuthenticated = !!user.password,
            lastUpdate = lastUpdates[pageId] || 0,
            elapsed = (date - lastUpdate) / 1000;

        if (!isAuthenticated || elapsed < throttleDelay) {
            return;  // don't do anything
        }

        var data = {
                user: user.name,
                pass: user.password,
                url: page.url,
                type: page.type,
                raw: serializeHTML(doc),
                content: analysis,
                date: date
            },
            options = {
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