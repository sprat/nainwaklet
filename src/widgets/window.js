var Signal = require('mini-signals');
var MessagesDispatcher = require('./messages-dispatcher');
var messagesDispatcher = MessagesDispatcher();
var closeDetector = CloseDetector();

function Window() {
    var childWindow;  // child DOM Window
    var messageReceived = new Signal();
    var closed = new Signal();
    var onMessage = messageReceived.dispatch.bind(messageReceived);

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

        // register the onMessage and onClose callbacks, so we receive messages
        // from the child window
        closeDetector.add(childWindow, onClose);
        messagesDispatcher.add(childWindow, onMessage);

        return true;  // success
    }

    function onClose() {
        childWindow = undefined;

        // remove the onMessage callback
        messagesDispatcher.remove(childWindow, onMessage);

        // send the closed signal
        closed.dispatch();
    }

    function close() {
        if (isClosed()) {  // already closed
            return false;  // failure
        }

        // close the window
        childWindow.close();
        return true;  // success
    }

    return {
        // methods
        open: open,
        close: close,
        isClosed: isClosed,
        // signals
        closed: closed,  // called after the window is closed
        messageReceived: messageReceived  // called when a message is received from the child window
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
