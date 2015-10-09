define(['require', 'utils/url'], function (require, urlUtils) {
    'use strict';

    /* Development settings */
    function fullUrl(path) {
        var relativeUrl = require.toUrl(path);
        return urlUtils.normalize(relativeUrl);
    }

    var scriptUrl = fullUrl('js/nany.js'),
        cssUrl = fullUrl('css/nany.css');

    return {
        channel: 'default',
        scriptUrl: scriptUrl,
        cssUrl: cssUrl
    };
});
