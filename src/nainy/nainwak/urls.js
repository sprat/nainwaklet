/* Nainwak URLs */
define(function () {
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

    return {
        gameUrl: gameUrl,
        imageUrl: imageUrl,
        isInGame: isInGame
    };
});