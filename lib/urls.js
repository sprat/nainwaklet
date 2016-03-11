/* Nainwak URLs */
var gameUrlRegex = /^https?:\/\/(www\.)?nainwak\.com\/jeu\/index\.php/;

function getPageUrl(page) {
    return '/jeu/' + page + '.php';
}

function getImageUrl(path) {
    return '/images/' + path;
}

function isGameUrl(url) {
    return gameUrlRegex.test(url || window.location.href);
}

module.exports = {
    getPageUrl: getPageUrl,
    getImageUrl: getImageUrl,
    isGameUrl: isGameUrl,
    gameUrlRegex: gameUrlRegex
};
