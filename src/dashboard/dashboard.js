var styles = require('./dashboard.css');
var contoursStyles = require('../contours.css');

function Dashboard(title) {
    function render(h) {
        return h('div', { 'class': styles.dashboard }, [
            h('div', { 'class': styles.dashboardTitle + ' ' + contoursStyles.VNT }, title),
            h('div', { 'class': styles.dashboardContent + ' ' + contoursStyles.TV }, 'En cours de développement...')
        ]);
    }

    return {
        render: render
    };
}

module.exports = Dashboard;
