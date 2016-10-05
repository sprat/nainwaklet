function Login(loginUrl) {
    function onclick() {
        alert('TODO: handle click, open ' + loginUrl);
    }

    function render(h) {
        return h('button', { onclick: onclick }, 'Connexion');
    }

    return {
        render: render
    };
}

module.exports = Login;
