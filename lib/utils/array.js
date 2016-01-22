/* Array utilities */
var htmlentities = require('./htmlentities');

// parses a string containing a representation of a Javascript array
// with JSON-compatible values and returns it
function parse(string) {
    var cleaned = string.replace(/([\[,]\s*)'(.*)'(\s*[,\]])/g, function (ignore, before, inside, after) {
            var escaped = inside.replace(/"/g, '\\"');  // escape double-quotes inside
            return before + '"' + escaped + '"' + after;  // wrap in double-quotes
        }),
        values = JSON.parse(cleaned);

    return values.map(htmlentities.decode);
}

// similar to Array.prototype.find which is only available in ES6
function find(array, predicate) {
    var length = array.length,
        i,
        element;

    for (i = 0; i < length; i += 1) {
        element = array[i];
        if (predicate(element)) {
            return element;
        }
    }
}

module.exports = {
    parse: parse,
    find: find
};
