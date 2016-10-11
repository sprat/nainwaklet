var Button = require('../widgets/button');
var Window = require('../widgets/window');

function Login(loginUrl) {
    var loginButton = Button('Connexion');
    var loginWindow = Window();

    loginButton.clicked.add(function loginButtonClicked() {
        loginWindow.open(loginUrl);
    });

    return {
        render: loginButton.render
    };
}

module.exports = Login;
