/* Production settings */
define(['utils/url'], function (urlUtils) {
    var script = document.scripts[document.scripts.length - 1],
        scriptUrl = script.src,  // should be the nany.js dist file url
        scriptBaseUrl = scriptUrl.slice(0, scriptUrl.lastIndexOf('/') + 1),
        cssUrl = urlUtils.normalize(scriptBaseUrl + '../css/nany.min.css'),
        channel = script.getAttribute('data-channel');

    return {
        channel: channel,
        scriptUrl: scriptUrl,
        cssUrl: cssUrl
    };
});
