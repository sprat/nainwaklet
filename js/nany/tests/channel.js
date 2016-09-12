var test = require('tape-catch'),
    Channel = require('../channel'),
    log = require('../log');


test('channel', function (assert) {
    var channel = Channel('#test-channel'),
        topic = 'chat',
        dataToSend = {
            message: 'Hello world!'
        };

    assert.timeoutAfter(5000);

    // subscribe to the "connected" event
    channel.on('connected', function (chan) {
        log('1. Connected');

        // check event data
        assert.strictEqual(chan, channel, 'Channel in connected event');

        // publish to a topic
        channel.publish(topic, dataToSend);
    });

    // subscribe to the "published" event
    channel.on('published', function (topic, data, chan) {
        log('2. Message published');

        // check event data
        assert.strictEqual(topic, 'chat', 'Topic in published event');
        assert.deepEqual(data, dataToSend, 'Data in published event');
        assert.strictEqual(chan, channel, 'Channel in published event');
    });

    // subscribe to the topic
    channel.on('message:chat', function (data, chan) {
        log('3. Message received on topic');

        // check event data
        assert.deepEqual(data, dataToSend, 'Data in message event');
        assert.strictEqual(chan, channel, 'Channel in message event');
    });

    // subscribe to all messages
    channel.on('message', function (topic, data, chan) {
        log('4. Message received');

        // check event data
        assert.strictEqual(topic, 'chat', 'Topic in message event');
        assert.deepEqual(data, dataToSend, 'Data in message event');
        assert.strictEqual(chan, channel, 'Channel in message event');

        // disconnect
        channel.disconnect();
    });

    // subscribe to the "disconnected" event
    channel.on('disconnected', function (chan) {
        log('5. Disconnected');

        // check event data
        assert.strictEqual(chan, channel, 'Channel in disconnected event');

        // test finished
        assert.end();
    });

    channel.connect();
});
