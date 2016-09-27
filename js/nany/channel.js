var PubNub = require('pubnub');
var Signal = require('mini-signals');

function Channel(name, publishKey, subscribeKey) {
    // TODO: authentication?
    // make sure we have a valid channel name
    name = safeName(name);

    var connected = new Signal();  // signal when a connection is opened
    var disconnected = new Signal();  // signal when a connection is closed
    var messagePublished = new Signal();  // signal when a message is published
    var messageReceived = new Signal();  // signal when a message is received

    var pubnub = new PubNub({
        publishKey: publishKey,
        subscribeKey: subscribeKey,
        ssl: true
    });

    function safeName(name) {
        // see https://www.pubnub.com/knowledge-base/discussion/427/what-are-valid-channel-names
        // eslint-disable-next-line no-control-regex
        return name.replace(/[\x00-\x1F,:.*/\\]/gi, '_');
    }

    // publish a message to the channel
    function publish(topic, message) {
        var content = {
            channel: name,
            message: {
                topic: topic,
                data: message
            }
        };

        pubnub.publish(content, function(status/*, response*/) {
            if (!status.error) {
                messagePublished.dispatch(topic, message);
            }
        });
    }

    // connect to channel
    function connect() {
        pubnub.subscribe({
            channels: [name],
            withPresence: true
        });
    }

    // disconnect from channel
    function disconnect() {
        pubnub.unsubscribe({
            channels: [name]
        });
    }

    pubnub.addListener({
        status: function (event) {
            //console.log(event);

            switch (event.operation) {
            case 'PNSubscribeOperation':
                connected.dispatch();
                return;
            case 'PNUnsubscribeOperation':
                disconnected.dispatch();
                return;
            }

            /*
            // errorOccured signal?
            //self.emit('error', error, self);
            switch (event.category) {
            case 'PNReconnectedCategory':
                self.emit('reconnected', self);
                break;
            case 'PNNetworkIssuesCategory':
                self.emit('networkIssues', self);
                break;
            case 'PNAccessDeniedCategory':
                self.emit('accessDenied', self);
                break;
            case 'PNNetworkDownCategory':
            case 'PNNetworkUpCategory':
                break;
            }
            */
        },
        message: function (event) {
            var message = event.message;
            messageReceived.dispatch(message.topic, message.data);
        }
        /*
        presence: function (event) {
            console.log(event);
            // event.action / event.uuid
        }
        */
    });

    return {
        get name() { return name; },
        connect: connect,
        disconnect: disconnect,
        publish: publish,
        connected: connected,
        disconnected: disconnected,
        messagePublished: messagePublished,
        messageReceived: messageReceived
    };
}

module.exports = Channel;
