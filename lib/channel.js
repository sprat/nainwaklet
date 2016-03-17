var config = require('./config'),
    channelConfig = config.channel,
    PubNub = require('pubnub'),
    Emitter = require('component-emitter'),
    md5 = require('md5');

function Channel(name) {
    // TODO: authentication?
    var channelId = md5(name),
        pubnub = PubNub({
            publish_key: channelConfig.publishKey,
            subscribe_key: channelConfig.subscribeKey
        });

    // publish a message to the channel
    function publish(topic, data) {
        var self = this;

        pubnub.publish({
            channel: channelId,
            message: {
                topic: topic,
                data: data
            },
            callback: function() {
                self.emit('published', topic, data, self);
            }
        });
    }

    // connect to channel
    function connect() {
        var self = this;

        self.emit('connecting', self);

        pubnub.subscribe({
            channel: channelId,
            message: function (message) {
                self.emit('message', message.topic, message.data, self);
            },
            connect: function () {
                self.emit('connected', self);
            },
            disconnect: function () {
                self.emit('disconnected', self);
            },
            reconnect: function () {
                self.emit('reconnected', self);
            },
            error: function (error) {
                self.emit('error', error, self);
            }
        });
    }

    // disconnect from channel
    function disconnect() {
        var self = this;

        pubnub.unsubscribe({
            channel: channelId,
            callback: function () {
                self.emit('disconnected', self);
            }
        });
    }

    return Emitter({
        name: name,
        connect: connect,
        disconnect: disconnect,
        publish: publish
    });
}

module.exports = Channel;
