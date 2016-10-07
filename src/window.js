var Signal = require('mini-signals');
var dom = require('./dom');
var messageDispatcher = dom.MessageDispatcher();

function Window() {
    var childWindow;  // child DOM Window
    var messageReceived = new Signal();
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

        // add the onMessage callback, so we receive the messages from the child
        // window
        messageDispatcher.add(childWindow, onMessage);

        return true;  // success
    }

    function close() {
        if (isClosed()) {  // already closed
            return false;  // failure
        }

        // close the window
        childWindow.close();
        childWindow = undefined;

        // remove the onMessage callback
        messageDispatcher.remove(childWindow, onMessage);

        return true;  // success
    }

    return {
        // methods
        open: open,
        close: close,
        isClosed: isClosed,
        // signals
        messageReceived: messageReceived  // called when a message is received from the child window
    };
}

module.exports = Window;
