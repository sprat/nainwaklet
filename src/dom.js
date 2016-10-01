/* DOM helpers & mounter */
var map = Array.prototype.map;
var maquette = require('maquette');
var h = maquette.h;

function find(selector, context) {
    context = context || document;
    var node = context.querySelector(selector);
    if (node) {
        return Element(node);
    }
}

function findAll(selector, context) {
    context = context || document;
    var nodes = context.querySelectorAll(selector);
    return map.call(nodes, Element);
}

function getInlineJavascript(doc) {
    var sources = Array.prototype.map.call(doc.scripts, function (script) {
        return script.src ? '' : script.innerHTML;
    });
    return sources.join('\n');
}

// aliases for Element definition
var _find = find;
var _findAll = findAll;

function Element(node) {
    if (node.node) {  // unwrap an element
        node = node.node;
    }

    function find(selector) {
        return _find(selector, node);
    }

    function findAll(selector) {
        return _findAll(selector, node);
    }

    function parent() {
        return Element(node.parentNode);
    }

    function children() {
        return map.call(node.childNodes, Element);
    }

    function firstChild() {
        var child = node.firstChild;
        if (child) {
            return Element(child);
        }
    }

    function lastChild() {
        var child = node.lastChild;
        if (child) {
            return Element(child);
        }
    }

    function text() {
        return node.textContent;
    }

    function html() {
        return node.innerHTML;
    }

    function attr(attribute) {
        return node.getAttribute(attribute);
    }

    function append(child) {
        var childNode = child.node || child;
        node.appendChild(childNode);
    }

    function prepend(child) {
        var childNode = child.node || child;
        node.insertBefore(childNode, node.firstChild);
    }

    return {
        get node() { return node; },
        find: find,
        findAll: findAll,
        parent: parent,
        children: children,
        firstChild: firstChild,
        lastChild: lastChild,
        text: text,
        html: html,
        attr: attr,
        append: append,
        prepend: prepend
    };
}

function Mounter() {
    // create a maquette projector for the rendering
    var projector = maquette.createProjector();

    // refresh all the components mounted by this mounter
    function refresh() {
        projector.scheduleRender();
    }

    // method: append / insertBefore / replace / merge
    function mount(method, element, componentOrRender) {
        var render = componentOrRender.render || componentOrRender;

        // render the virtual DOM tree
        function renderTree() {
            return render(h, refresh) || h('div.nany-empty');
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
        return mount('append', Element(node), component);
    }

    // prepend a component to a parent node
    function prepend(node, component) {
        return mount('insertBefore', Element(node).firstChild(), component);
    }

    // replace a node by a component
    function replace(node, component) {
        return mount('replace', Element(node), component);
    }

    return {
        append: append,
        prepend: prepend,
        replace: replace,
        refresh: refresh
    };
}

module.exports = {
    find: find,
    findAll: findAll,
    getInlineJavascript: getInlineJavascript,
    Mounter: Mounter
};
