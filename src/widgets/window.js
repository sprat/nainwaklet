var Signal = require('mini-signals');
var MessagesDispatcher = require('./messages-dispatcher');
var messagesDispatcher = MessagesDispatcher();
var closeDetector = CloseDetector();

function getOrigin(url) {
    var link = document.createElement('a');
    link.href = url;
    link.href = link.href;  // IE 8/9 trick to convert relative to absolute url
    return link.protocol + '//' + link.host;
}

function Window() {
    var childWindow;  // child DOM Window
    var messageReceived = new Signal();
    var closed = new Signal();
    var onMessage = messageReceived.dispatch.bind(messageReceived);
    var openedOrigin;

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
        openedOrigin = getOrigin(url);

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
        childWindow.postMessage(message, targetOrigin || openedOrigin);
    }

    function onClose() {
        childWindow = undefined;

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
