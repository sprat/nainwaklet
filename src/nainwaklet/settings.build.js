define(function () {
    var script = document.scripts[document.scripts.length - 1],
        scriptUrl = script.src,  // should be the nainwaklet.js dist file url
        scriptBaseUrl = scriptUrl.slice(0, scriptUrl.lastIndexOf('/')),
        imageBaseUrl = scriptBaseUrl + '../images/',
        cssBaseUrl = scriptBaseUrl + '../css/',
        channel = script.getAttribute('data-channel');

    function getImageUrl(name) {
        return imageBaseUrl + name;
    }

    function getCssUrl(name) {
        return cssBaseUrl + name;
    }

    return {
        channel: channel,
        scriptUrl: scriptUrl,
        getImageUrl: getImageUrl,
        getCssUrl: getCssUrl
    };
});
