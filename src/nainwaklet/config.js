define(['require'], function (require) {

    /*
    var script = document.scripts[document.scripts.length - 1],
        scriptUrl = script.src,
        scriptChannel = script.getAttribute('data-channel');
    */

    var scriptUrl = require.toUrl('nainwakletDist'),
        hubUrl = require.toUrl('../../hub.html');

    function getImageUrl(name) {
        return require.toUrl('images/' + name);
    }

    return {
        scriptUrl: scriptUrl,
        hubUrl: hubUrl,
        channel: 'default',
        getImageUrl: getImageUrl
    };
});