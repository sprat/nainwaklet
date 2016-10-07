/* DOM helpers */
var map = Array.prototype.map;
var arrayFindIndex = require('array-findindex');

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

function MessageDispatcher(parentWindow) {
    parentWindow = parentWindow || window;

    // we cannot use window objects or functions as object keys, so we store them
    // in a array
    var callbacks = [];

    // register a global handler to receive child windows/frames messages
    parentWindow.addEventListener('message', function onMessage(event) {
        callbacks.forEach(function (element) {
            if (event.source === element.source) {
                element.callback(event.data, event.origin);
            }
        });
    });

    function add(source, callback) {
        callbacks.push({
            source: source,
            callback: callback
        });
    }

    function remove(source, callback) {
        var index = arrayFindIndex(callbacks, function (element) {
            return (element.source === source) && (element.callback === callback);
        });

        if (index !== -1) {
            callbacks.slice(index, 1);
        }
    }

    return {
        add: add,
        remove: remove
    };
}

module.exports = {
    find: find,
    findAll: findAll,
    getInlineJavascript: getInlineJavascript,
    Element: Element,
    MessageDispatcher: MessageDispatcher
};
