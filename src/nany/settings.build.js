define(function () {
    var script = document.scripts[document.scripts.length - 1],
        scriptUrl = script.src,  // should be the nany.js dist file url
        scriptBaseUrl = scriptUrl.slice(0, scriptUrl.lastIndexOf('/')),
        cssUrl = scriptBaseUrl + '/css/nany.css',
        channel = script.getAttribute('data-channel');

    return {
        channel: channel,
        scriptUrl: scriptUrl,
        cssUrl: cssUrl
    };
});
