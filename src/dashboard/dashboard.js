var Login = require('./login');
var Logout = require('./logout');
var styles = require('./dashboard.css');
var contours = require('./contours.css');

function Dashboard(config, storage, refreshUI) {
    var title = config.name;
    var login = Login(config.loginUrl);
    var logout = Logout();

    login.loggedIn.add(function (authorization) {
        storage.set('authorization', authorization);
    });

    logout.loggedOut.add(function () {
        storage.set('authorization', undefined);
    });

    // refresh the UI when the authorization is changed in storage
    storage.changed.add(function (key) {
        if (key === 'authorization') {
            refreshUI();
        }
    });

    function render(h) {
        var authorization = storage.get('authorization');
        var content = authorization ? logout : login;

        return h('div', { class: styles.dashboard }, [
            h('div', { class: [contours.VNT, styles.dashboardTitle] }, title),
            h('div', { class: [contours.TV, styles.dashboardContent] }, content.render(h))
        ]);
    }

    return {
        render: render
    };
}

module.exports = Dashboard;
