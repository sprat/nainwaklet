var styles = require('./box.css');

function Box(content) {
    function render(h) {
        var rendered = h.render(content);
        if (rendered && !Array.isArray(rendered) || rendered.length > 0) {
            return h('div', { class: styles.box }, rendered);
        }
    }

    return {
        render: render
    };
}

module.exports = Box;
