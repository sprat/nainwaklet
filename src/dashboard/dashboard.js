var Connect = require('./connect');
var styles = require('./dashboard.css');
var contours = require('./contours.css');

function Dashboard(config, updater, storage, refreshUI) {
    var title = config.name;
    var connect = config.loginUrl ? Connect(config.loginUrl, storage) : undefined;

    // refresh the UI when the authorization is changed in storage
    storage.changed.add(function (key) {
        if (key === 'authorization') {
            refreshUI();
        }
    });

    function render(h) {
        return h('div', { class: styles.dashboard }, [
            h('div', { class: [contours.VNT, styles.dashboardTitle] }, title),
            h('div', { class: [contours.TV, styles.dashboardContent] }, [
                updater ? updater.render(h) : '',
                connect ? connect.render(h) : ''
            ])
        ]);
    }

    return {
        render: render
    };
}

module.exports = Dashboard;
