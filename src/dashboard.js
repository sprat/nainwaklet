require('./dashboard.css');

function Dashboard(channelName) {
    function render(h) {
        return h('div.nany.nany-dashboard', [
            h('div.nany-dashboard-title.VNT', channelName),
            h('div.nany-dashboard-content.TV', 'En cours de développement...')
        ]);
    }

    return {
        render: render
    };
}

module.exports = Dashboard;
