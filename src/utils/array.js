/* Array utilities */
define(['./assert'], function (assert) {
    function decodeEntities(string) {
        // TODO: not really efficient, a regex-based implementation would be better
        var txt = document.createElement('textarea');
        txt.innerHTML = string;
        return txt.value;
    }

    // parses a string containing a representation of a Javascript array
    // with JSON-compatible values and returns it
    function parse(string) {
        var cleaned = string.replace(/([\[,]\s*)'(.*)'(\s*[,\]])/g, function (ignore, before, inside, after) {
                var escaped = inside.replace(/"/g, '\\"');  // escape double-quotes inside
                return before + '"' + escaped + '"' + after;  // wrap in double-quotes
            }),
            values = JSON.parse(cleaned);

        return values.map(function (value) {
            return decodeEntities(value);
        });
    }

    // similar to Array.prototype.find which is only available in ES6
    function find(array, predicate) {
        var length = array.length,
            i = 0,
            element;

        // Note: a for loop would be better here but I can't/don't want to
        // disable the jslint warning in the remaining source
        while (i < length) {
            element = array[i];
            if (predicate(element)) {
                return element;
            }
            i += 1;
        }
    }

    // convert an array of keys and an array of values to an object
    function toObject(keys, values) {
        assert(keys.length === values.length, 'should have the same length');

        var obj = {};

        keys.forEach(function (key, i) {
            obj[key] = values[i];
        });

        return obj;
    }

    return {
        parse: parse,
        find: find,
        toObject: toObject
    };
});