var test = require('tape-catch');
var Channel = require('../channel');
var log = require('../log');
var publishKey = 'pub-c-8be41a11-cbc5-4427-a5ad-e18cf5a466e4';
var subscribeKey = 'sub-c-38ae8020-6d33-11e5-bf4b-0619f8945a4f';

test('channel', function (assert) {
    var channel = Channel('test-channel', publishKey, subscribeKey);
    var topic = 'chat';
    var dataToSend = {
        message: 'Hello world!'
    };

    assert.timeoutAfter(5000);

    // subscribe to the "connected" signal
    channel.connected.add(function () {
        log('1. Connected');

        // publish to a topic
        channel.publish(topic, dataToSend);
    });

    // subscribe to the "messagePublished" signal
    channel.messagePublished.add(function (topic, data) {
        log('2. Message published');

        // check event data
        assert.strictEqual(topic, 'chat', 'Topic in messagePublished event');
        assert.deepEqual(data, dataToSend, 'Data in messagePublished event');
    });

    // subscribe to the "messageReceived" signal
    channel.messageReceived.add(function (topic, data) {
        log('3. Message received');

        // check event data
        assert.strictEqual(topic, 'chat', 'Topic in messageReceived event');
        assert.deepEqual(data, dataToSend, 'Data in messageReceived event');

        // disconnect
        channel.disconnect();
    });

    // subscribe to the "disconnected" signal
    channel.disconnected.add(function () {
        log('4. Disconnected');

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