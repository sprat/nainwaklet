function Dashboard(channelName) {
    function render(h) {
        return h('div.nany.dashboard', [
            h('div.VNT.title', channelName),
            h('div.TV.content', 'En cours de développement...')
        ]);
    }

    return {
        render: render
    };
}

module.exports = Dashboard;
