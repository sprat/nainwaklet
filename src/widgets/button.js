var Signal = require('mini-signals');

function Button(content) {
    var clicked = new Signal();
    var onclick = clicked.dispatch.bind(clicked);

    function render(h) {
        return h('button', {
            key: render,
            onclick: onclick
        }, h.render(content));
    }

    return {
        clicked: clicked,
        render: render
    };
}

module.exports = Button;
