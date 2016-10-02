var styles = require('./popin.css');

/* Popin */
function Popin(label, content) {
    function render(h) {
        var rendered = content.render(h);

        // check if there's something to display, otherwise don't render anything
        if (!rendered) {
            return;
        }

        var button = h('button', { 'class': styles.popinButton }, label);
        var contentWrapper = h('div', { 'class': styles.popinContent }, rendered);
        return h('div', { 'class': styles.popin }, [button, contentWrapper]);
    }

    return {
        render: render
    };
}

module.exports = Popin;
