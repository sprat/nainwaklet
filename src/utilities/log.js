/* eslint-disable no-console */
var log = function noLog() {
    return;
};

// some browsers do not have a console, or have a console only when the
// developer tools are opened (e.g. IE9)
if (console && console.log) {
    // console.log may be a host object and may not have a bind method (e.g. IE9)
    log = Function.prototype.bind.call(console.log, console);
}

module.exports = log;
