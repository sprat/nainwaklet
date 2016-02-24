var xhr = require('xhr'),
    serializeHTML = require('print-html'),
    log = require('./log');

/* Ring class */
function Ring(conf) {
    var updateUrl = conf.ringUpdateUrl,
        user = conf.user;

    if (!updateUrl || !user) {
        return;
    }

    function sendUpdate(doc/*, page*/) {
        if (!user.password) {
            return;  // don't do anything
        }

        var date = Date.now(),  // unix timestamp
            data = {
                user: user.name,
                pass: user.password,
                url: doc.location.href,
                content: serializeHTML(doc),
                date: date
            },
            options = {
                contentType: 'application/json',
                body: JSON.stringify(data)
            };

        log('Posting page source to ' + updateUrl);

        xhr.post(updateUrl, options, function (error, response) {
            log('Response received:');
            log(response);
        });
    }

    return {
        sendUpdate: sendUpdate
    };
}

module.exports = Ring;