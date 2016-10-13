var Signal = require('mini-signals');
var styles = require('./button.css');

function Button(content) {
    var clicked = new Signal();
    var onclick = clicked.dispatch.bind(clicked);

    function render(h) {
        return h('button', {
            key: render,
            class: styles.button,
            onclick: onclick
        }, h.render(content));
    }

    return {
        clicked: clicked,
        render: render
    };
}

module.exports = Button;
