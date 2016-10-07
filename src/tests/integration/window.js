var test = require('tape-catch');
var Window = require('../../window');

test('Window', function (assert) {
    var childWindow = Window();
    var url = 'https://rawgit.com/sprat/11a24923ca0b5e9a406f3fb8a54c48fa/raw/04797252d3e070fa3ffe5ea88567e26482fd8b12/postmessage.html';

    // add a message received signal handler
    childWindow.messageReceived.add(function (/*message, origin*/) {
        assert.strictEqual(childWindow.isClosed(), false, 'Opened');
        assert.strictEqual(childWindow.open(url), false, 'Cannot be opened again');

        /*
        // TODO: implement a closed signal
        // Due to cross-origin access restrictions, we can't attach a unload handler
        // on the child window. So we must poll the closed status of the windows instead.
        childWindow.closed.add(function () {
            assert.strictEqual(childWindow.isClosed(), true, 'Closed');
            assert.end();
        });
        */

        assert.strictEqual(childWindow.close(), true, 'Closing');
        assert.end();
    });

    assert.strictEqual(childWindow.isClosed(), true, 'Starts closed');
    assert.strictEqual(childWindow.close(), false, 'Cannot be closed');

    // In order for our window not to be blocked by the popup blockers, we must
    // create a link and simulate a click... what a hack!
    var link = document.createElement('a');
    link.addEventListener('click', function () {
        assert.strictEqual(childWindow.open(url), true, 'Opening');
    });
    document.body.appendChild(link);
    link.click();
});
