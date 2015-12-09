define(['module', 'pubnub', 'tiny-emitter', 'utils/assert', 'utils/base64'], function (module, PUBNUB, EventEmitter, assert, base64) {
    'use strict';

    function Channel(name) {
        // TODO: authentication?
        var safeName = base64.encodeUrl(name),
            emitter = new EventEmitter(),
            reservedTopics = [
                'connecting', 'connected', 'disconnected', 'reconnected',
                'error', 'published'
            ],
            config = module.config(),
            pubnub = PUBNUB({
                publish_key: config.publishKey,
                subscribe_key: config.subscribeKey
            });

        // publish a message to the channel
        function publish(topic, data) {
            var self = this;

            // make sure we can't publish on a "reserved" channel topic
            assert(reservedTopics.indexOf(topic) === -1, 'Reserved topic: ' + topic);

            pubnub.publish({
                channel: safeName,
                message: {
                    topic: topic,
                    data: data
                },
                callback: function() {
                    emitter.emit('published', topic, data, self);
                }
            });
        }

        // connect to channel
        function connect() {
            var self = this;

            emitter.emit('connecting', self);

            pubnub.subscribe({
                channel: safeName,
                message: function (message) {
                    emitter.emit(message.topic, message.data, self);
                },
                connect: function () {
                    emitter.emit('connected', self);
                },
                disconnect: function () {
                    emitter.emit('disconnected', self);
                },
                reconnect: function () {
                    emitter.emit('reconnected', self);
                },
                error: function (error) {
                    emitter.emit('error', error, self);
                }
            });
        }

        // disconnect from channel
        function disconnect() {
            var self = this;

            pubnub.unsubscribe({
                channel: safeName,
                callback: function () {
                    emitter.emit('disconnected', self);
                }
            });
        }

        return {
            name: name,
            connect: connect,
            disconnect: disconnect,
            publish: publish,
            on: emitter.on.bind(emitter),
            off: emitter.off.bind(emitter),
            once: emitter.once.bind(emitter)
        };
    }

    return Channel;
});