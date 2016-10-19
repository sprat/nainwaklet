var Button = require('../widgets/button');
var Window = require('../widgets/window');
var log = require('../log');

function Connect(loginUrl, storage) {
    var loginButton = Button('Connexion');
    var logoutButton = Button('Déconnexion');
    var loginWindow = Window();

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

    function render(h) {
        var authorization = storage.get('authorization');
        var button = authorization ? logoutButton : loginButton;
        return button.render(h);
    }

    return {
        render: render
    };
}

module.exports = Connect;
