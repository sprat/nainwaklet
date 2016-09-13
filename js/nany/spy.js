var Emitter = require('component-emitter');

/* Spy class */
function Spy(frameWindow) {
    var frame = frameWindow.frameElement;
    var self;

    function onLoad() {
        var doc = frameWindow.document;
        self.emit('change', doc);
    }

    self = Emitter({
        destroy: function() {
            frame.removeEventListener('load', onLoad, false);
        }
    });

    // add event listener
    frame.addEventListener('load', onLoad, false);

    return self;
}

module.exports = Spy;
