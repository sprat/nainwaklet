var Button = require('../widgets/button');
var Window = require('../widgets/window');
var styles = require('./login.css');

function Login(loginUrl) {
    var loginButton = Button('Connexion');
    var loginWindow = Window();

    loginButton.clicked.add(function () {
        loginWindow.open(loginUrl);
    });

    function render(h) {
        return h('div', [
            h('p', { class: styles.message }, 'Pour activer la mise à jour automatique, vous devez vous connecter.'),
            h('p', { class: styles.buttons }, h.render(loginButton))
        ]);
    }

    return {
        render: render
    };
}

module.exports = Login;
