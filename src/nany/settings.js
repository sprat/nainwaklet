/* Development settings */
define(['require', 'utils/url'], function (require, url) {
    function fullUrl(path) {
        var relativeUrl = require.toUrl(path),
            location = url.parse(relativeUrl);
        return location.href;
    }

    var scriptUrl = fullUrl('dist/nany.js'),
        cssUrl = fullUrl('css/nany.css');

    return {
        channel: 'default',
        scriptUrl: scriptUrl,
        cssUrl: cssUrl
    };
});
