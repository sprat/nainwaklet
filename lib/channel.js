var config = require('./config'),
    channelConfig = config.channel,
    PUBNUB = require('pubnub'),
    EventEmitter = require('tiny-emitter'),
    md5 = require('md5');


function Channel(name) {
    // TODO: authentication?
    var channelId = md5(name),
        emitter = new EventEmitter(),
        reservedTopics = [
            'connecting', 'connected', 'disconnected', 'reconnected',
            'error', 'published'
        ],
        pubnub = PUBNUB({
            publish_key: channelConfig.publishKey,
            subscribe_key: channelConfig.subscribeKey
        });

    // publish a message to the channel
    function publish(topic, data) {
        var self = this;

        // make sure we can't publish on a "reserved" channel topic
        if (reservedTopics.indexOf(topic) > -1) {
            throw new Error('Reserved topic: ' + topic);
        }

        pubnub.publish({
            channel: channelId,
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
            channel: channelId,
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
            channel: channelId,
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


module.exports = Channel;
