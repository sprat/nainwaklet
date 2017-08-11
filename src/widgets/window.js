var array = require('core-js/library/fn/array');
var Signal = require('mini-signals');
var messagesDispatcher = MessagesDispatcher();
var closeDetector = CloseDetector();

function Window() {
    var childWindow;  // child DOM Window
    var initialOrigin;
    var messageReceived = new Signal();
    var closed = new Signal();
    var onMessage = messageReceived.dispatch.bind(messageReceived);

    function getOrigin(url) {
        var link = document.createElement('a');
        link.href = url;
        link.href = link.href;  // IE 8/9 trick to convert relative to absolute url
        return link.protocol + '//' + link.host;
    }

    function isClosed() {
        return childWindow === undefined || childWindow.closed;
    }

    function open(url) {
        if (!isClosed()) {  // already opened
            return false;  // failure
        }

        // open the child window
        childWindow = window.open(url, '_blank');
        if (!childWindow) {  // failed to open
            return false;  // failure
        }

        // register a onClose callback to detect when the window is closed
        closeDetector.add(childWindow, onClose);

        // register a onMessage callback so that we receive messages from the
        // child window
        messagesDispatcher.add(childWindow, onMessage);

        // remember the opened origin for sendMessage feature
        initialOrigin = getOrigin(url);

        return true;  // success
    }

    function close() {
        if (isClosed()) {  // already closed
            return false;  // failure
        }

        // close the window
        childWindow.close();
        return true;  // success
    }

    function sendMessage(message, targetOrigin) {
        childWindow.postMessage(message, targetOrigin || initialOrigin);
    }

    function onClose() {
        childWindow = undefined;
        initialOrigin = undefined;

        // remove the onMessage callback
        messagesDispatcher.remove(childWindow, onMessage);

        // send the closed signal
        closed.dispatch();
    }

    return {
        // methods
        open: open,
        close: close,
        isClosed: isClosed,
        sendMessage: sendMessage,
        get initialOrigin() {
            return initialOrigin;
        },
        // signals
        // called after the window is closed
        closed: closed,
        // called when a message is received from the child window, with message
        // and origin arguments
        messageReceived: messageReceived
    };
}

function MessagesDispatcher(parentWindow) {
    parentWindow = parentWindow || window;

    // we cannot use window objects or functions as object keys, so we store them
    // in a array
    var callbacks = [];

    // register a global handler to receive child windows/frames messages
    parentWindow.addEventListener('message', function onMessage(event) {
        callbacks.forEach(function (element) {
            if (event.source === element.source) {
                element.callback(event.data, event.origin);
            }
        });
    });

    function add(source, callback) {
        callbacks.push({
            source: source,
            callback: callback
        });
    }

    function remove(source, callback) {
        var index = array.findIndex(callbacks, function (element) {
            return (element.source === source) && (element.callback === callback);
        });

        if (index !== -1) {
            callbacks.splice(index, 1);
        }
    }

    return {
        add: add,
        remove: remove
    };
}

// Due to cross-origin access restrictions, we can't always attach a unload handler
// on the child windows. So we must poll the closed status of the windows instead.
function CloseDetector(pollingDelay) {
    pollingDelay = pollingDelay || 500;
    var mainWindow = window;
    var checks = [];
    var intervalId;

    function add(window, callback) {
        function check() {
            var index;

            if (window.closed) {
                index = checks.indexOf(check);
                checks.splice(index, 1);

                if (checks.length === 0) {
                    mainWindow.clearInterval(intervalId);
                }

                callback();
            }
        }

        checks.push(check);

        if (checks.length > 0) {
            intervalId = mainWindow.setInterval(checkAll, pollingDelay);
        }
    }

    function checkAll() {
        checks.forEach(function (check) {
            check();
        });
    }

    return {
        add: add
    };
}

module.exports = Window;
