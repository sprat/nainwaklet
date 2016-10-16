var array = require('core-js/library/fn/array');

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
            callbacks.slice(index, 1);
        }
    }

    return {
        add: add,
        remove: remove
    };
}

module.exports = MessagesDispatcher;
