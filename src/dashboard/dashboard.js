var styles = require('./dashboard.css');
var contours = require('./contours.css');

// TODO: remove the dashboard, should be the app's render function
function Dashboard(applicationName, ring, storage, refreshUI) {
    // refresh the UI when the authorization is changed in storage
    // TODO: move this into the Ring class as it is related to that
    storage.changed.add(function (key) {
        if (key === 'authorization') {
            refreshUI();
        }
    });

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
