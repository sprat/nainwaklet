/* safe unset */
define(function () {
    'use strict';

    function unset(obj, key) {
        try {
            delete obj[key];
        } catch (e) {
            obj[key] = undefined;
        }
    }

    return unset;
});
