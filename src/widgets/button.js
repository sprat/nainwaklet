var Signal = require('mini-signals');

function Button(content) {
    var clicked = new Signal();
    var onclick = clicked.dispatch.bind(clicked);

    function render(h) {
        var ctn = content.render ? content.render(h) : content;
        return h('button', {
            key: render,
            onclick: onclick
        }, ctn);
    }

    return {
        clicked: clicked,
        render: render
    };
}

module.exports = Button;
