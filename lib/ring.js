var xhr = require('xhr'),
    serializeHTML = require('print-html'),
    log = require('./log'),
    urls = require('./urls');

/* Ring class */
function Ring(url, user, pages, throttleDelay) {
    if (!url || !user) {
        throw new Error('url and user parameters are mandatory');
    }

    pages = pages || ['detect', 'invent', 'perso', 'even', 'encyclo'];
    throttleDelay = throttleDelay || 60;

    var lastUpdates = {},
        pagesUrls = pages.map(urls.getPageUrl);

    function sendUpdate(doc) {
        var loc = doc.location,
            pageUrl = loc.origin + loc.pathname,
            isRelevant = pagesUrls.indexOf(pageUrl) > -1,
            isAuthenticated = !!user.password,
            lastUpdate = lastUpdates[pageUrl] || 0,
            now = Date.now(),  // unix timestamp
            elapsed = (now - lastUpdate) / 1000;

        if (!isRelevant || !isAuthenticated || elapsed < throttleDelay) {
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

        log('Posting page source to ' + url);

        xhr.post(url, options, function (error, response) {
            log(response);
            // TODO: check response status: auth errors
            lastUpdates[pageUrl] = now;
        });
    }

    return {
        sendUpdate: sendUpdate
    };
}

module.exports = Ring;