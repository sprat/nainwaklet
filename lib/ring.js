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

    function sendUpdate(doc, date, analysis) {
        var loc = doc.location,
            pageUrl = loc.pathname,
            isRelevant = pagesUrls.indexOf(pageUrl) > -1,
            isAuthenticated = !!user.password,
            lastUpdate = lastUpdates[pageUrl] || 0,
            elapsed = (date - lastUpdate) / 1000;

        if (!isRelevant || !isAuthenticated || elapsed < throttleDelay) {
            return;  // don't do anything
        }

        var data = {
                user: user.name,
                pass: user.password,
                url: loc.href,
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
            lastUpdates[pageUrl] = date;
        });
    }

    return {
        sendUpdate: sendUpdate
    };
}

module.exports = Ring;