define(function () {
    /* assert function */
    'use strict';

    function assert(condition, message) {
        if (!condition) {
            throw new Error(message || 'Assertion failed');
        }
    }

    return assert;
});