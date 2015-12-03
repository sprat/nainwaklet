define(['pubnub', 'tinyemitter', 'utils/base64'], function (PUBNUB, EventEmitter, base64) {
    'use strict';

    function Channel(name) {
        // TODO: move API keys in RequireJS configuration
        // TODO: authentication?
        var safeName = base64.encodeUrl(name),
            emitter = new EventEmitter(),
            pubnub = PUBNUB({
                publish_key: 'pub-c-8be41a11-cbc5-4427-a5ad-e18cf5a466e4',
                subscribe_key: 'sub-c-38ae8020-6d33-11e5-bf4b-0619f8945a4f'
            });

        function emit(event, data) {
            emitter.emit(event, data);
        }

        // send a message to the channel
        function send(topic, data) {
            pubnub.publish({
                channel: safeName,
                message: {
                    topic: topic,
                    data: data
                },
                callback: function() {
                    emit('sent');
                }
            });
        }

        // connect to channel
        function connect() {
            // TODO: perform some checks before subscribing?
            emitter.emit('connecting');
            pubnub.subscribe({
                channel: safeName,
                message: function (message) {
                    emit(message.topic, message.data);
                },
                connect: function () {
                    emit('connected');
                },
                disconnect: function () {
                    emit('disconnected');
                },
                reconnect: function () {
                    emit('reconnected');
                },
                error: function (error) {
                    emit('error', error);
                }
            });
        }

        // disconnect from channel
        function disconnect() {
            // TODO: perform some checks before unsubscribing?
            pubnub.unsubscribe({
                channel: safeName
            });
        }

        return {
            name: name,
            connect: connect,
            disconnect: disconnect,
            send: send,
            on: emitter.on.bind(emitter),
            off: emitter.off.bind(emitter),
            once: emitter.once.bind(emitter)
        };
    }

    return Channel;
});