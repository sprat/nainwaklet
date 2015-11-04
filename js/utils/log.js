/* eslint-disable no-console */
define(function () {
    /* log function */
    'use strict';

    var console = window.console,
        bind = Function.prototype.bind;

    if (console && console.log && bind) {
        return bind.call(console.log, console);
    }

    return function noLog() {
        return;
    };
});