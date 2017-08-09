var styles = require('./box.css');

function Box(content) {
    function render(h) {
        var rendered = h.render(content);
        if (rendered) {
            return h('div', { class: styles.box }, rendered);
        }
    }

    return {
        render: render
    };
}

module.exports = Box;
