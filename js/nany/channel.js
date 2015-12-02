define(['pubnub', 'utils/base64', 'utils/log'], function (PUBNUB, base64, log) {
    'use strict';

    function Channel(name) {
        // TODO: move api keys in requirejs configuration
        var safeName = base64.encodeUrl(name),
            pubnub = PUBNUB({
                publish_key: 'pub-c-8be41a11-cbc5-4427-a5ad-e18cf5a466e4',
                subscribe_key: 'sub-c-38ae8020-6d33-11e5-bf4b-0619f8945a4f'
                /*uuid: userId*/
            }),
            subscriptions = {};

        function publish(topic, data, done) {
            pubnub.publish({
                channel: safeName,
                message: {
                    topic: topic,
                    data: data
                },
                callback: done
            });
        }

        function subscribe(topic, callback) {
            var callbacks = subscriptions[topic] || (subscriptions[topic] = []),
                index = callbacks.indexOf(callback);

            if (index === -1) {
                callbacks.push(callback);
            }
        }

        function unsubscribe(topic, callback) {
            var callbacks = subscriptions[topic] || [],
                index = callbacks.indexOf(callback);

            if (index > -1) {
                callbacks.splice(index, 1);
            }
        }

        function dispatchMessage(topic, data) {
            var callbacks = subscriptions[topic] || [];
            callbacks.forEach(function (callback) {
                callback(data);
            });
        }

        function disconnect() {
            // TODO: perform some checks before unsubscribing?
            pubnub.unsubscribe({
                channel: safeName
            });
        }

        function connect(done) {
            // connect to channel
            log('Connecting to ' + name);
            // TODO: perform some checks before subscribing?
            pubnub.subscribe({
                channel: safeName,
                message: function (message) {  //, env, channel
                    dispatchMessage(message.topic, message.data);
                },
                connect: function () {
                    log('Connected to ' + name);
                    if (done) {
                        done();
                    }
                },
                disconnect: function () {
                    log('Disconnected from ' + name);
                },
                reconnect: function () {
                    log('Reconnected to ' + name);
                },
                error: function () {
                    log('PubNub Network Error');
                }
            });
        }

        return {
            name: name,
            connect: connect,
            disconnect: disconnect,
            publish: publish,
            subscribe: subscribe,
            unsubscribe: unsubscribe
        };
    }

    return Channel;
});