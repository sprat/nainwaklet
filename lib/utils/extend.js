/* extend function */
function extend(target) {
    var sources = Array.prototype.slice.call(arguments, 1);
    sources.forEach(function(source) {
        if (source) {
            Object.keys(source).forEach(function (prop) {
                target[prop] = source[prop];
            });
        }
    });
    return target;
}


module.exports = extend;
