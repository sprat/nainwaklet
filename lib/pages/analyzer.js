function getAllScriptsCode(doc) {
    var sources = Array.prototype.map.call(doc.scripts, function (script) {
        return script.src ? '' : script.innerHTML;
    });
    return sources.join('\n');
}

module.exports = {
    getAllScriptsCode: getAllScriptsCode
};