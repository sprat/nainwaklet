var styles = require('./dashboard.css');
var contourStyles = require('./contours.css');

function Dashboard(channelName) {
    function render(h) {
        return h('div', { 'class': styles.dashboard }, [
            h('div', { 'class': styles.dashboardTitle + ' ' + contourStyles.VNT }, channelName),
            h('div', { 'class': styles.dashboardContent + ' ' + contourStyles.TV }, 'En cours de développement...')
        ]);
    }

    return {
        render: render
    };
}

module.exports = Dashboard;
