/* Development settings */
define(['require', 'utils/url'], function (require, url) {
    function fullUrl(path) {
        var relativeUrl = require.toUrl(path),
            location = url.parse(relativeUrl);
        return location.href;
    }

    var scriptUrl = fullUrl('dist/nainwaklet.js');

    function getCssUrl(name) {
        return fullUrl('css/' + name);
    }

    return {
        channel: 'default',
        scriptUrl: scriptUrl,
        getCssUrl: getCssUrl
    };
});
