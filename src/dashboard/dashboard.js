var styles = require('./dashboard.css');
var contours = require('./contours.css');

// TODO: remove the dashboard, should be the app's render function
function Dashboard(applicationName, ring) {
    function render(h) {
        return h('div', { class: styles.dashboard }, [
            h('div', { class: [contours.VNT, styles.dashboardTitle] }, applicationName),
            h('div', { class: [contours.TV, styles.dashboardContent] }, [
                ring ? ring.render(h) : ''
            ])
        ]);
    }

    return {
        render: render
    };
}

module.exports = Dashboard;
