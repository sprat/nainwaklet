/* Development settings */
define(['require', 'utils/url'], function (require, url) {
    function fullUrl(path) {
        var relativeUrl = require.toUrl(path),
            location = url.parse(relativeUrl);
        return location.href;
    }

    var scriptUrl = fullUrl('dist/nainwaklet.js');

    function getImageUrl(name) {
        return fullUrl('images/' + name);
    }

    function getCssUrl(name) {
        return fullUrl('css/' + name);
    }

    return {
        channel: 'default',
        scriptUrl: scriptUrl,
        getImageUrl: getImageUrl,
        getCssUrl: getCssUrl
    };
});
