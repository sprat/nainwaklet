define(['pusher', 'utils/base64', 'utils/log'], function (Pusher, base64, log) {
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

        function onMessage(data) {
            log(data);
        }

        log('Connecting to ' + channelName);
        log(safeChannelName);
        channel = pusher.subscribe(safeChannelName);
        channel.bind('msg', onMessage);

        return {
        };
    }

    return Connection;
});