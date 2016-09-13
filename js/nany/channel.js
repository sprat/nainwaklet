var PubNub = require('pubnub');
var Emitter = require('component-emitter');
var md5 = require('md5');

function Channel(name, publishKey, subscribeKey) {
    // TODO: authentication?
    // TODO: don't use md5 here
    /* Invalid chars in channel names:
     * comma ,
     * colon :
     * period .
     * astrick *
     * slash /
     * backslash: \
     * non-printable ASCII control characters
     * Unicode zero
     */
    var channelId = md5(name);
    var pubnub = new PubNub({
        publishKey: publishKey,
        subscribeKey: subscribeKey,
        ssl: true
    });

    // publish a message to the channel
    function publish(topic, data) {
        var self = this;
        var content = {
            channel: channelId,
            message: {
                topic: topic,
                data: data
            }
        };

        pubnub.publish(content, function(status/*, response*/) {
            if (!status.error) {
                self.emit('published', topic, data, self);
            }
        });
    }

    // connect to channel
    function connect() {
        pubnub.subscribe({
            channels: [channelId],
            withPresence: true
        });
    }

    // disconnect from channel
    function disconnect() {
        pubnub.unsubscribe({
            channels: [channelId]
        });
    }

    var self = Emitter({
        name: name,
        connect: connect,
        disconnect: disconnect,
        publish: publish
    });

    pubnub.addListener({
        status: function (event) {
            console.log(event);

            switch (event.operation) {
            case 'PNSubscribeOperation':
                self.emit('connected', self);
                return;
            case 'PNUnsubscribeOperation':
                self.emit('disconnected', self);
                return;
            }

            //self.emit('error', error, self);
//            switch (event.category) {
//            case 'PNReconnectedCategory':
//                self.emit('reconnected', self);
//                break;
//            case 'PNNetworkIssuesCategory':
//                self.emit('networkIssues', self);
//                break;
//            case 'PNAccessDeniedCategory':
//                self.emit('accessDenied', self);
//                break;
//            case 'PNNetworkDownCategory':
//            case 'PNNetworkUpCategory':
//                break;
//            }
        },
        message: function (event) {
            var message = event.message;
            self.emit('message:' + message.topic, message.data, self);
            self.emit('message', message.topic, message.data, self);
        },
        presence: function (event) {
            console.log(event);
            // event.action / event.uuid
        }
    });

    return self;
}

module.exports = Channel;
