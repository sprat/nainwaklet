var test = require('tape-catch');
var Window = require('src/widgets/window');

test('Window', function (assert) {
    var childWindow = Window();
    var url = 'https://rawgit.com/sprat/11a24923ca0b5e9a406f3fb8a54c48fa/raw/8e26382e470bc55b4fdb6f6ceef50ab8ce4a4c8d/postmessage.html';

    // add a message received signal handler
    var binding = childWindow.messageReceived.add(function (message, origin) {
        assert.strictEqual(message, 'Hello', 'first message');
        assert.strictEqual(origin, 'https://rawgit.com', 'first message origin');
        assert.strictEqual(childWindow.isClosed(), false, 'opened');
        assert.strictEqual(childWindow.open(url), false, 'cannot be opened again');
        binding.detach();

        childWindow.messageReceived.add(function (message, origin) {
            assert.strictEqual(message, 'How are you?', 'second message');
            assert.strictEqual(origin, 'https://rawgit.com', 'second message origin');

            childWindow.closed.add(function () {
                assert.strictEqual(childWindow.isClosed(), true, 'closed');
                assert.strictEqual(childWindow.close(), false, 'cannot be closed');
                assert.end();
            });

            assert.strictEqual(childWindow.close(), true, 'closing');
            assert.strictEqual(childWindow.isClosed(), true, 'closed immediately');
        });

        childWindow.sendMessage('Hello');
    });

    assert.strictEqual(childWindow.isClosed(), true, 'starts closed');
    assert.strictEqual(childWindow.close(), false, 'cannot be closed');

    // In order for our window not to be blocked by the popup blockers, we must
    // create a link and simulate a click... what a hack!
    var link = document.createElement('a');
    link.addEventListener('click', function () {
        assert.strictEqual(childWindow.open(url), true, 'opening');
    });
    document.body.appendChild(link);
    link.click();
});
