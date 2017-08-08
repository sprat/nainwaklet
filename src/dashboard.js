var styles = require('./dashboard.css');
var contours = require('./contours.css');

// FIXME: Should the dashboard be the application's render function?
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
