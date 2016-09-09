var decodeEntities = require('htmldec'),
    zipObject = require('zip-object');

function int(value) {
    return parseInt(value, 10);
}

function getJS(doc) {
    var sources = Array.prototype.map.call(doc.scripts, function (script) {
        return script.src ? '' : script.innerHTML;
    });
    return sources.join('\n');
}

function decodeEnt(value) {
    if (typeof value === 'string') {
        value = decodeEntities(value);
    }
    return value;
}

// parses a string representation of a Javascript value
function evaluateJS(string) {
    // should be safe because we only pass code coming from the Nainwak game
    // pages, not from user input
    // TODO: but maybe we can make it safer?
    var value = eval(string);

    if (Array.isArray(value)) {
        return value.map(decodeEnt);
    } else {
        return decodeEnt(value);
    }
}

function buildObjectFromJS(js, regex) {
    var result = {};

    js.replace(regex, function (match, name) {
        var values = Array.prototype.slice.call(arguments, 2, arguments.length - 2);
        values = values.map(evaluateJS);
        result[name] = (values.length > 1) ? values : values[0];
    });

    return result;
}

function buildObjectsFromJSSequences(js, regex, keys) {
    var objects = [];

    // process all matches
    js.replace(regex, function (match, sequence) {
        var values = evaluateJS('[' + sequence + ']'),
            object = zipObject(keys, values);
        objects.push(object);
    });

    return objects;
}

function find(context, selector) {
    return context.querySelector(selector);
}

function findAll(context, selector) {
    return Array.prototype.slice.call(context.querySelectorAll(selector));
}

function getText(context, selector) {
    var el = find(context, selector);
    if (el) {
        return el.textContent;
    }
}

function getHtml(context, selector) {
    var el = find(context, selector);
    if (el) {
        return el.innerHTML;
    }
}

function getAttr(context, selector, attr) {
    var el = find(context, selector);
    if (el) {
        return el.getAttribute(attr);
    }
}

module.exports = {
    int: int,
    getJS: getJS,
    evaluateJS: evaluateJS,
    buildObjectFromJS: buildObjectFromJS,
    buildObjectsFromJSSequences: buildObjectsFromJSSequences,
    find: find,
    findAll: findAll,
    getText: getText,
    getHtml: getHtml,
    getAttr: getAttr
};
