var Signal = require('mini-signals');
var Button = require('../widgets/button');
var Window = require('../widgets/window');
var styles = require('./login.css');

function Login(loginUrl) {
    var loggedIn = new Signal();
    var button = Button('Connexion');
    var window = Window();

    //window.closed
    window.messageReceived.add(function (message/*, origin*/) {
        // TODO: check origin
        window.close();
        loggedIn.dispatch(message);
    });

    button.clicked.add(function () {
        window.open(loginUrl);
    });

    function render(h) {
        return h('div', { class: styles.login }, [
            h('p', { class: styles.loginMessage }, 'Pour activer la mise à jour automatique, vous devez vous connecter.'),
            h('p', { class: styles.loginActions }, button.render(h))
        ]);
    }

    return {
        render: render,
        // signals
        loggedIn: loggedIn
    };
}

module.exports = Login;
