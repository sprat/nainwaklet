var test = require('tape-catch');
var Channel = require('src/channel');
var publishKey = 'pub-c-8be41a11-cbc5-4427-a5ad-e18cf5a466e4';
var subscribeKey = 'sub-c-38ae8020-6d33-11e5-bf4b-0619f8945a4f';

test('channel: signals', function (assert) {
    var channel = Channel('test-channel', publishKey, subscribeKey);
    var topic = 'chat';
    var dataToSend = {
        message: 'Hello world!'
    };

    assert.timeoutAfter(8000);

    // subscribe to the "connected" signal
    channel.connected.add(function () {
        assert.comment('1. connected');

        // publish to a topic
        channel.publish(topic, dataToSend);
    });

    // subscribe to the "messagePublished" signal
    channel.messagePublished.add(function (topic, data) {
        assert.comment('2. message published');

        // check event data
        assert.strictEqual(topic, 'chat', 'topic in messagePublished event');
        assert.deepEqual(data, dataToSend, 'data in messagePublished event');
    });

    // subscribe to the "messageReceived" signal
    channel.messageReceived.add(function (topic, data) {
        assert.comment('3. message received');

        // check event data
        assert.strictEqual(topic, 'chat', 'topic in messageReceived event');
        assert.deepEqual(data, dataToSend, 'data in messageReceived event');

        // disconnect
        channel.disconnect();
    });

    // subscribe to the "disconnected" signal
    channel.disconnected.add(function () {
        assert.comment('4. disconnected');

        // test finished
        assert.end();
    });

    // start the test
    channel.connect();
});

test('channel.name', function (assert) {
    var channel = Channel('my.super:duper/channel007*name is\nnice', publishKey, subscribeKey);
    assert.strictEqual(channel.name, 'my_super_duper_channel007_name is_nice');
    assert.end();
});
