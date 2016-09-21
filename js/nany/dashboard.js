function Dashboard(channelName) {
    var content = [];

    function render(h) {
        return h('div.nany.dashboard', [
            h('div.VNT.title', channelName),
            h('div.TV.content', content)
        ]);
    }

    return {
        render: render
    };
}

module.exports = Dashboard;
