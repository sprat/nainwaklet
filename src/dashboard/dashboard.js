var Login = require('./login');
var styles = require('./dashboard.css');
var contours = require('./contours.css');

function Content() {
    function render(h) {
        return h('p', 'MAJ automatique activée');
    }

    return {
        render: render
    };
}

function Dashboard(config, store, refreshUI) {
    var title = config.name;
    var login = Login(config.loginUrl);
    var content = Content();

    login.loggedIn.add(function (authorization) {
        store.authorization = authorization;
        store.save();
        refreshUI();
    });

    function render(h) {
        var authorization = store.authorization;
        var innerContent = authorization ? content : login;

        return h('div', { class: styles.dashboard }, [
            h('div', { class: [contours.VNT, styles.dashboardTitle] }, title),
            h('div', { class: [contours.TV, styles.dashboardContent] }, h.render(innerContent))
        ]);
    }

    return {
        render: render
    };
}

module.exports = Dashboard;
