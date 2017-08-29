var Signal = require('mini-signals');

/* Spy class */
function Spy(frameWindow) {
    var frame = frameWindow.frameElement;
    var documentChanged = new Signal();

    function onLoad() {
        var doc = frameWindow.document;
        var path = doc.location.pathname;
        var params = {};
        documentChanged.dispatch(doc, path, params);
    }

    function destroy() {
        frame.removeEventListener('load', onLoad, false);
    }

    // add event listener
    frame.addEventListener('load', onLoad, false);

    return {
        documentChanged: documentChanged,
        destroy: destroy
    };
}

module.exports = Spy;
