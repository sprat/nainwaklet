/* Nainwak URLs */
define(['./user'], function (createUser) {
    var origin = 'http://www.nainwak.com';

    function gameUrl(page) {
        return origin + '/jeu/' + (page || 'index') + '.php';
    }

    function imageUrl(path) {
        return origin + '/images/' + path;
    }

    /* Check if we are in the Nainwak game page */
    function isInGame(window) {
        var loc = window.location,
            pageUrl = loc.origin + loc.pathname;
        return pageUrl === gameUrl();
    }

    /* Get the Nainwak User info from the menu frame */
    function getUser(window) {
        if (!isInGame(window)) {
            return;
        }

        var frame = window.frames.menu,
            doc = frame.document,
            title = doc.querySelector('.news-titre'),
            name = title.querySelector('td:last-child').innerHTML,
            avatar = title.querySelector('td:first-child img').src;
        return createUser(name, avatar);
    }

    return {
        origin: origin,
        gameUrl: gameUrl,
        imageUrl: imageUrl,
        isInGame: isInGame,
        getUser: getUser
    };
});