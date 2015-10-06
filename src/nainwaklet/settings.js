/* Development settings */
define(['require'], function (require) {
    var scriptUrl = require.toUrl('dist/nainwaklet.js'),
        hubUrl = require.toUrl('../../hub.html');

    function getImageUrl(name) {
        return require.toUrl('images/' + name);
    }

    function getCssUrl(name) {
        return require.toUrl('css/' + name);
    }

    return {
        scriptUrl: scriptUrl,
        hubUrl: hubUrl,
        channel: 'default',
        getImageUrl: getImageUrl,
        getCssUrl: getCssUrl
    };
});
