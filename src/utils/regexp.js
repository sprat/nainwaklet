/* RegExp utilities */
define(['./assert'], function (assert) {
    function getAllMatches(regex, text) {
        assert(regex && regex.exec && regex.test, 'not a RegExp object');

        var matches = [],
            addNextMatch = function () {
                var match = regex.exec(text);
                if (match !== null) {
                    matches.push(match);
                    return true;
                }
                return false;
            },
            found;

        if (regex.global) {
            do {
                found = addNextMatch();
            } while (found);
        } else {
            addNextMatch();
        }

        return matches;
    }

    return {
        getAllMatches: getAllMatches
    };
});