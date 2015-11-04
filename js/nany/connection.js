define(['pusher', 'utils/base64', 'utils/log'], function (Pusher, base64, log) {
    'use strict';

    /*
    function Connection(channelName) {
        var pubnub = PUBNUB.init({
                publish_key: 'pub-c-8be41a11-cbc5-4427-a5ad-e18cf5a466e4',
                subscribe_key: 'sub-c-38ae8020-6d33-11e5-bf4b-0619f8945a4f'
            }),
            safeChannelName = base64.encodeUrl(channelName);

        log('Connecting to channel ' + channelName + ' [' + safeChannelName + ']');

        function onMessage(data) {
            log(data);
        }

        pubnub.subscribe({
            channel: safeChannelName,
            message: onMessage
        });

        return {
        };
    }
    */

    function Connection(channelName) {
        var app_key = '408668d142e0e6fdab8f',
            pusher = new Pusher(app_key, {
                encrypted: true
            }),
            safeChannelName = base64.encodeUrl(channelName),
            channel;

        // Pusher channel names should only include lower and uppercase
        // letters, numbers and the following punctuation _ - = @ , . ;
        // => we use base64url encoding for the channel name

        log('Connecting to channel ' + channelName + ' [' + safeChannelName + ']');

        function onMessage(data) {
            log(data);
        }

        channel = pusher.subscribe(safeChannelName);
        channel.bind('msg', onMessage);

        return {
        };
    }

    return Connection;
});