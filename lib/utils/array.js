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

module.exports = {
    parse: parse
};
