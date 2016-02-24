/* Nainwak URLs */
var gameUrlRegex = /^https?:\/\/(www\.)?nainwak\.com\/jeu\/index\.php/;

function getNainwakBaseUrl() {
    var loc = window.location;
    return gameUrlRegex.test(loc.href) ? loc.origin : 'http://www.nainwak.com';
}

function getPageUrl(page) {
    return getNainwakBaseUrl() + '/jeu/' + page + '.php';
}

function getImageUrl(path) {
    return getNainwakBaseUrl() + '/images/' + path;
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
