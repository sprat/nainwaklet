/* DOM helpers */
var array = require('core-js/library/fn/array');

function find(selector, context) {
    context = context || document;
    return Element(context).find(selector);
}

function findAll(selector, context) {
    context = context || document;
    return Element(context).findAll(selector);
}

function Element(node) {
    if (node.node) {  // unwrap an element
        node = node.node;
    }

    function find(selector) {
        var found = node.querySelector(selector);
        if (found) {
            return Element(found);
        }
    }

    function findAll(selector) {
        var nodes = node.querySelectorAll(selector);
        return array.from(nodes, Element);
    }

    function parent() {
        return Element(node.parentNode);
    }

    function children() {
        return array.from(node.childNodes, Element);
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

module.exports = {
    find: find,
    findAll: findAll,
    Element: Element
};
