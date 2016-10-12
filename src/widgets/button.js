var Signal = require('mini-signals');
var classNames = require('classnames');
var theme = require('./theme.css');

function Button(content, classes) {
    var clicked = new Signal();
    var onclick = clicked.dispatch.bind(clicked);

    function render(h) {
        var ctn = content.render ? content.render(h) : content;
        return h('button', {
            key: render,
            class: classNames(theme.button, classes),
            onclick: onclick
        }, ctn);
    }

    return {
        clicked: clicked,
        render: render
    };
}

module.exports = Button;
