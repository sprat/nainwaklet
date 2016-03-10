var decodeEntities = require('htmldec');

function decodeEnt(value) {
    if (typeof value === 'string') {
        value = decodeEntities(value);
    }
    return value;
}

/*
// convert quotes to double quotes
function escapeQuotes(string) {
    return string.replace(/([\[,]\s*)'(.*)'(\s*[,\]])/g, function (ignore, before, inside, after) {
        var escaped = inside.replace(/"/g, '\\"');  // escape double-quotes inside
        return before + '"' + escaped + '"' + after;  // wrap in double-quotes
    });
}
*/

function Analyzer(doc) {
    function getScriptsCode() {
        var sources = Array.prototype.map.call(doc.scripts, function (script) {
            return script.src ? '' : script.innerHTML;
        });
        return sources.join('\n');
    }

    function select(selector) {
        return doc.querySelector(selector);
    }

    function getAttribute(selector, attr) {
        var el = select(selector);
        if (el) {
            return el.getAttribute(attr);
        }
    }

    function getText(selector) {
        var el = select(selector);
        if (el) {
            return el.textContent;
        }
    }

    // parses a string representation of a Javascript value
    function evaluateJS(string) {
        // should be safe because we only pass code coming from the Nainwak
        // game pages, not user input
        // TODO: but maybe we can make it safer?
        var value = eval(string);

        if (Array.isArray(value)) {
            return value.map(decodeEnt);
        } else {
            return decodeEnt(value);
        }
    }

    return {
        getScriptsCode: getScriptsCode,
        getText: getText,
        getAttribute: getAttribute,
        evaluateJS: evaluateJS
    };
}

module.exports = Analyzer;
