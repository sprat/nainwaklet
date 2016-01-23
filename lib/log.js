/* eslint-disable no-console */
/* log function */
var console = window.console,
    bind = Function.prototype.bind,
    log = function noLog() {
        return;
    };


if (console && console.log && bind) {
    log = bind.call(console.log, console);
}


module.exports = log;
