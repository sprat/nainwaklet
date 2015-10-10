define(function () {
    'use strict';

    /* Build settings */
    var script = document.scripts[document.scripts.length - 1],
        scriptUrl = script.src,  // should be the nany dist file url
        channel = script.getAttribute('data-channel');

    return {
        channel: channel,
        scriptUrl: scriptUrl
    };
});
