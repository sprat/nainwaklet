/* DOM helpers */
var map = Array.prototype.map;

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
    var sources = map.call(doc.scripts, function (script) {
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

module.exports = {
    find: find,
    findAll: findAll,
    getInlineJavascript: getInlineJavascript,
    Element: Element
};
