define(['require'], function (require) {

    /*
    var script = document.scripts[document.scripts.length - 1],
        scriptUrl = script.src,
        scriptChannel = script.getAttribute('data-channel');
    */

    function scriptUrl() {
        return require.toUrl('.');
    }

    function imageUrl(name) {
        return require.toUrl('images/' + name);
    }

    function hubUrl() {
        return require.toUrl('../../hub.html');
    }

    return {
        scriptUrl: scriptUrl,
        imageUrl: imageUrl,
        hubUrl: hubUrl,
        channel: 'default'
    };
});