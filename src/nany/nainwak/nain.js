/* Nainwak URLs */
define(['./urls'], function (urls) {
    /* Get the Nainwak User info from the menu frame */
    function get(window) {
        if (!urls.isInGame(window)) {
            return;
        }

        var frame = window.frames.menu,
            doc = frame.document,
            title = doc.querySelector('.news-titre'),
            name = title.querySelector('td:last-child').innerHTML,
            image = title.querySelector('td:first-child img').src;

        return {
            nom: name,
            image: image
        };
    }

    return {
        get: get
    };
});