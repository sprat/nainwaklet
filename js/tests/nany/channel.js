/* global QUnit */
define(['nany/channel', 'utils/log'], function (Channel, log) {
    'use strict';

    QUnit.module('nany/channel');

    QUnit.test('sendReceive', function (assert) {
        var channel = Channel('#test'),
            done = assert.async(),
            dataToSend = {
                message: 'Hello world!'
            };

        // subscribe to the "chat" event
        channel.on('chat', function (data) {
            log('Chat event');

            assert.deepEqual(data, dataToSend, 'Data received in chat event');
            //assert.equal(this, channel, 'Channel received in chat event');
            channel.disconnect();
            done();
        });

        // subscribe to the "connected" event
        channel.on('connected', function () {
            log('Connected');
            //assert.equal(this, channel, 'Channel received in connected event');

            // publish to the "chat"
            channel.send('chat', dataToSend);
        });

        log('Connecting');
        channel.connect();
    });
});