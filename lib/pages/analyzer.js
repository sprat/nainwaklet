var decodeEntities = require('htmldec');

function decodeEnt(value) {
    if (typeof value === 'string') {
        value = decodeEntities(value);
    }
    return value;
}

// convert quotes to double quotes
function escapeQuotes(string) {
    return string.replace(/([\[,]\s*)'(.*)'(\s*[,\]])/g, function (ignore, before, inside, after) {
        var escaped = inside.replace(/"/g, '\\"');  // escape double-quotes inside
        return before + '"' + escaped + '"' + after;  // wrap in double-quotes
    });
}

function Analyzer(doc) {
    function getAllScriptsCode() {
        var sources = Array.prototype.map.call(doc.scripts, function (script) {
            return script.src ? '' : script.innerHTML;
        });
        return sources.join('\n');
    }

    function select(selector) {
        return doc.querySelector(selector);
    }

    function selectAll(selector) {
        return doc.querySelectorAll(selector);
    }

    // parses a string representation of a Javascript value
    function parseJSValue(string) {
        var value = JSON.parse(escapeQuotes(string));

        if (Array.isArray(value)) {
            return value.map(decodeEnt);
        } else {
            return decodeEnt(value);
        }
    }

    return {
        getAllScriptsCode: getAllScriptsCode,
        select: select,
        selectAll: selectAll,
        parseJSValue: parseJSValue
    };
}

module.exports = Analyzer;
