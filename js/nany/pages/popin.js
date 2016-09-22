/* Popin */
function Popin(content) {
    function render(h) {
        var rendered = content.render(h);
        // check if there's something to display, otherwise don't render anything
        if (rendered) {
            var button = h('button.popin-button', '?');
            var box = h('.popin-box', rendered);
            return h('.nany.popin', [button, box]);
        }
    }

    return {
        render: render
    };
}

module.exports = Popin;
