define(['nany/channel', 'utils/log'], function (Channel, log) {
    'use strict';

    QUnit.module('nany/channel');

    QUnit.test('publishSubscribe', function (assert) {
        var channel = Channel('#test-channel'),
            doneConnecting = assert.async(),
            donePublishing = assert.async(),
            doneDisconnected = assert.async(),
            topic = 'chat',
            dataToSend = {
                message: 'Hello world!'
            };

        // subscribe to the "connecting" event
        channel.on('connecting', function (chan) {
            log('1. Connecting');

            // check event data
            assert.equal(chan, channel, 'Channel in connecting event');

            // we're done for this part
            doneConnecting();
        });

        // subscribe to the "connected" event
        channel.on('connected', function (chan) {
            log('2. Connected');

            // check event data
            assert.equal(chan, channel, 'Channel in connected event');

            // publish to a topic
            channel.publish(topic, dataToSend);
        });

        // subscribe to the "published" event
        channel.on('published', function (topic, data, chan) {
            log('3. Message published');

            // check event data
            assert.equal(topic, 'chat', 'Topic in published event');
            assert.deepEqual(data, dataToSend, 'Data in published event');
            assert.equal(chan, channel, 'Channel in published event');

            // we're done for this part
            donePublishing();
        });

        // subscribe to the topic
        channel.on(topic, function (data, chan) {
            log('4. Message received');

            // check event data
            assert.deepEqual(data, dataToSend, 'Data in topic event');
            assert.equal(chan, channel, 'Channel in topic event');

            // disconnect
            channel.disconnect();
        });

        // subscribe to the "disconnected" event
        channel.on('disconnected', function (chan) {
            log('5. Disconnected');

            // check event data
            assert.equal(chan, channel, 'Channel in disconnected event');

            // we're done for this part
            doneDisconnected();
        });

        channel.connect();
    });
});