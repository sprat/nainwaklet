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

    return {
        getAllScriptsCode: getAllScriptsCode,
        select: select,
        selectAll: selectAll
    };
}

module.exports = Analyzer;
