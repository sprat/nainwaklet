var xhr = require('xhr');
var serializeHTML = require('print-html');
var httpHeaders = require('./http-headers');
var Button = require('./widgets/button');
var Window = require('./widgets/window');
var log = require('./log');


/* Ring class */
function Ring(config, storage) {
    var updateUrl = config.updateUrl;

    // login
    var loginUrl = config.loginUrl;
    var loginButton = Button('Connexion');
    var logoutButton = Button('Déconnexion');
    var loginWindow = Window();

    // we don't know if authorization is needed yet, so we assume it's not needed
    // until we receive an authorization error
    var needAuthorization = false;

    loginButton.clicked.add(function () {
        loginWindow.open(loginUrl);
    });

    logoutButton.clicked.add(function () {
        storage.set('authorization', undefined);
    });

    loginWindow.messageReceived.add(function (message, origin) {
        loginWindow.close();

        // check origin
        if (origin !== loginWindow.initialOrigin) {
            log('Invalid origin in authorization message, should match the loginUrl one');
        } else {
            storage.set('authorization', message);
            //loggedIn.dispatch(message);
        }
    });

    // store the retry after dates for each page type
    var retryAfterDates = {};

    function getAuthorization() {
        return storage.get('authorization');
    }

    function isAllowed(authorization) {
        return !needAuthorization || authorization;
    }

    function send(page, doc, date, analysis, joueur) {
        var retryAfterDate = retryAfterDates[page.url];
        var authorization = getAuthorization();

        if (retryAfterDate && date < retryAfterDate) {
            log('No update: rate-limiting');
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
            contenu: analysis,
            date: date,
            joueur: joueur.nom
        };

        var options = {
            url: updateUrl,
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

        log('Sending an update to ' + updateUrl);

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

            // handle rate-limiting header
            var retryAfterDate = httpHeaders.getRetryAfter(response.headers);
            retryAfterDates[page.url] = retryAfterDate;
        });
    }

    function render(h) {
        var authorization = getAuthorization();
        var enabledWord = isAllowed(authorization) ? 'activée' : 'désactivée';
        var authButton = authorization ? logoutButton : loginButton;

        return h('div', { class: 'ring' }, [  // TODO: styles.ring
            h('p', 'Mise à jour ' + enabledWord),
            loginUrl ? authButton.render(h) : ''
        ]);
    }

    return {
        send: send,
        render: render
    };
}

module.exports = Ring;
