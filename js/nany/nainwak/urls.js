define(function () {
    /* Nainwak URLs */
    'use strict';

    var baseUrl = 'http://www.nainwak.com';

    function gameUrl(page) {
        return baseUrl + '/jeu/' + (page || 'index') + '.php';
    }

    function imageUrl(path) {
        return baseUrl + '/images/' + path;
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