var xhr = require('xhr'),
    serializeHTML = require('print-html'),
    log = require('./log');

/* Ring class */
function Ring(conf) {
    var updateUrl = conf.ringUpdateUrl,
        updateDelay = conf.ringUpdateDelay * 1000,  // in milliseconds
        user = conf.user,
        lastUpdates = {};

    if (!updateUrl || !user) {
        return;
    }

    function sendUpdate(doc) {
        var loc = doc.location,
            pageId = loc.pathname,
            now = Date.now(),  // unix timestamp
            lastUpdate = lastUpdates[pageId] || 0,
            elapsed = now - lastUpdate;

        if (!user.password || elapsed < updateDelay) {
            return;  // don't do anything
        }

        var data = {
                user: user.name,
                pass: user.password,
                url: loc.href,
                content: serializeHTML(doc),
                date: now
            },
            options = {
                contentType: 'application/json',
                body: JSON.stringify(data)
            };

        log('Posting page source to ' + updateUrl);

        xhr.post(updateUrl, options, function (error, response) {
            log(response);
            // TODO: check response status: auth errors
            lastUpdates[pageId] = now;
        });
    }

    return {
        sendUpdate: sendUpdate
    };
}

module.exports = Ring;