var xhr = require('xhr'),
    serializeHTML = require('print-html'),
    log = require('./log');

/* Ring class */
function Ring(url, user, pages, throttleDelay) {
    if (!url || !user) {
        throw new Error('url and user parameters are mandatory');
    }

    pages = pages || ['detect', 'invent', 'perso', 'even'];
    throttleDelay = throttleDelay || 60;

    var lastUpdates = {};

    function sendUpdate(doc, date, analysis) {
        var loc = doc.location,
            path = loc.pathname,
            type = /\/(\w+)\.php$/.exec(path)[1],
            isRelevant = pages.indexOf(type) > -1,
            isAuthenticated = !!user.password,
            lastUpdate = lastUpdates[type] || 0,
            elapsed = (date - lastUpdate) / 1000;

        if (!isRelevant || !isAuthenticated || elapsed < throttleDelay) {
            return;  // don't do anything
        }

        var data = {
                user: user.name,
                pass: user.password,
                url: loc.href,
                type: type,
                content: serializeHTML(doc),
                analysis: analysis,
                date: date
            },
            options = {
                contentType: 'application/json',
                body: JSON.stringify(data)
            };

        log('Sending a ring update to ' + url);

        xhr.post(url, options, function (error, response) {
            var success = response.statusCode === 200;
            log(success ? 'OK' : 'FAIL');
            // TODO: check response status: auth errors
            lastUpdates[type] = date;
        });
    }

    return {
        sendUpdate: sendUpdate
    };
}

module.exports = Ring;