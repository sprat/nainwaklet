var maquette = require('maquette');
var classNames = require('classnames');
var dom = require('src/utilities/dom');

function h(/*arguments*/) {
    var properties = arguments[1];

    if (properties && !properties.hasOwnProperty('vnodeSelector') && !Array.isArray(properties) && typeof properties === 'object') {
        var class_ = classNames(properties.class);  // make sure we render the classes to a valid class string
        if (class_) {
            properties.class = class_;
        }
        else {
            delete properties.class;
        }
    }

    return maquette.h.apply(maquette, arguments);
}

h.render = function (child) {
    if (child.render) {
        return child.render(h);
    }

    if (typeof child === 'function') {
        return child(h);
    }

    return child;
};

var empty = h('div', {
    styles: {
        display: 'none'
    }
});

function Mounter() {
    // create a maquette projector for the rendering
    var projector = maquette.createProjector();

    // refresh all the components mounted by this mounter
    function scheduleRender() {
        projector.scheduleRender();
    }

    // method: append / insertBefore / replace / merge
    function mount(method, element, component) {
        // render the virtual DOM tree
        function renderTree() {
            var rendered = h.render(component);
            return rendered ? rendered : empty;
        }

        // unmount the component (does not restore the original node)
        function unmount() {
            projector.detach(renderTree);
        }

        // add the component to the projector
        projector[method](element.node, renderTree);

        // return the unmount function
        return unmount;
    }

    // append a component to a parent node
    function append(node, component) {
        return mount('append', dom.Element(node), component);
    }

    // prepend a component to a parent node
    function prepend(node, component) {
        return mount('insertBefore', dom.Element(node).firstChild(), component);
    }

    // replace a node by a component
    function replace(node, component) {
        return mount('replace', dom.Element(node), component);
    }

    return {
        append: append,
        prepend: prepend,
        replace: replace,
        scheduleRender: scheduleRender
    };
}

module.exports = Mounter;
