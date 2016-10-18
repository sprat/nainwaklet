var Signal = require('mini-signals');
var Button = require('../widgets/button');
var styles = require('./logout.css');

function Logout() {
    var loggedOut = new Signal();
    var button = Button('Déconnexion');

    button.clicked.add(function () {
        loggedOut.dispatch();
    });

    function render(h) {
        return h('div', { key: render, class: styles.logout }, [
            h('p', { class: styles.logoutMessage }, 'MAJ automatique activée'),
            h('p', { class: styles.logoutActions }, button.render(h))
        ]);
    }

    return {
        render: render,
        // signals
        loggedOut: loggedOut
    };
}

module.exports = Logout;
