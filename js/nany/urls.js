define(function () {
    /* Nainwak URLs */
    'use strict';

    var baseUrl = 'http://www.nainwak.com',
        gameUrl;

    function getPageUrl(page) {
        return baseUrl + '/jeu/' + page + '.php';
    }

    function getImageUrl(path) {
        return baseUrl + '/images/' + path;
    }

    gameUrl = getPageUrl('index');

    /* Check if we are in the Nainwak game page */
    function isInGame(window) {
        var loc = window.location,
            pageUrl = loc.origin + loc.pathname;
        return pageUrl === gameUrl;
    }

    return {
        gameUrl: gameUrl,
        getPageUrl: getPageUrl,
        getImageUrl: getImageUrl,
        isInGame: isInGame
    };
});