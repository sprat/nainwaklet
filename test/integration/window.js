var test = require('tape-catch');
var Window = require('src/window');

test('Window', function (assert) {
    var childWindow = Window();
    var currentOrigin = window.location.origin;
    var url = window.nanyTestsFixturesBaseUrl + 'postmessage.html';

    // add a message received signal handler
    var binding = childWindow.messageReceived.add(function (message, origin) {
        assert.strictEqual(message, 'Hello', 'first message');
        assert.strictEqual(origin, currentOrigin, 'first message origin');
        assert.strictEqual(childWindow.isClosed(), false, 'opened');
        assert.strictEqual(childWindow.open(url), false, 'cannot be opened again');
        binding.detach();

        childWindow.messageReceived.add(function (message, origin) {
            assert.strictEqual(message, 'How are you?', 'second message');
            assert.strictEqual(origin, currentOrigin, 'second message origin');
            assert.strictEqual(childWindow.isClosed(), false, 'not closed either');

            childWindow.closed.add(function () {
                assert.strictEqual(childWindow.isClosed(), true, 'closed');
                assert.strictEqual(childWindow.close(), false, 'cannot be closed');
                assert.strictEqual(childWindow.initialOrigin, undefined, 'initial origin not set anymore');
                assert.end();
            });

            assert.strictEqual(childWindow.close(), true, 'closing');
        });

        childWindow.sendMessage('Hello');
    });

    assert.strictEqual(childWindow.isClosed(), true, 'starts closed');
    assert.strictEqual(childWindow.close(), false, 'cannot be closed');
    assert.strictEqual(childWindow.initialOrigin, undefined, 'initial origin not set yet');

    // In order for our window not to be blocked by the popup blockers, we must
    // create a link and simulate a click... what a hack!
    var link = document.createElement('a');
    link.addEventListener('click', function () {
        assert.strictEqual(childWindow.open(url), true, 'opening (popup blocker need to be disabled)');
        assert.strictEqual(childWindow.initialOrigin, currentOrigin, 'initial origin set');
    });
    document.body.appendChild(link);
    link.click();
});
