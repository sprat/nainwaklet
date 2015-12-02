/* global QUnit */
define(['nany/channel'], function (Channel) {
    'use strict';

    QUnit.module('nany/channel');

    QUnit.test('publish_subscribe', function (assert) {
        var channel = Channel('test_channel'),
            done = assert.async(),
            dataToSend = {
                message: 'Hello world!'
            };

        channel.subscribe('chat', function (data) {
            assert.deepEqual(data, dataToSend);
            channel.disconnect();
            done();
        });

        channel.connect(function() {
            channel.publish('chat', dataToSend);
        });
    });
});