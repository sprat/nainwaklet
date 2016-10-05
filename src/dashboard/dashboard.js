var Login = require('./login');
var styles = require('./dashboard.css');
var contours = require('../contours.css');

function Dashboard(title, loginUrl) {
    var content = Login(loginUrl);

    function render(h) {
        return h('div', { class: styles.dashboard }, [
            h('div', { class: styles.dashboardTitle + ' ' + contours.VNT }, title),
            h('div', { class: styles.dashboardContent + ' ' + contours.TV }, content.render(h))
        ]);
    }

    return {
        render: render
    };
}

module.exports = Dashboard;
