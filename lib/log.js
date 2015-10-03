/* eslint-disable no-console */

/* log function */
define(function () {
    var console = window.console,
        bind = Function.prototype.bind;

    if (console && console.log && bind) {
        return bind.call(console.log, console);
    }

    return function noLog() {
        return;
    };
});