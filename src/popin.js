require('./popin.css');

/* Popin */
function Popin(label, content) {
    function render(h) {
        var rendered = content.render(h);

        // check if there's something to display, otherwise don't render anything
        if (!rendered) {
            return;
        }

        var button = h('button.nany-popin-button', label);
        var box = h('div.nany-popin-box', rendered);
        return h('div.nany.nany-popin', [button, box]);
    }

    return {
        render: render
    };
}

module.exports = Popin;
