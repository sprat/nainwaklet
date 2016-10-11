var Window = require('../widgets/window');

function Login(loginUrl) {
    var loginWindow = Window();

    function onclick() {
        loginWindow.open(loginUrl);
        return false;
    }

    function render(h) {
        return h('button', { onclick: onclick }, 'Connexion');
    }

    return {
        render: render
    };
}

module.exports = Login;
