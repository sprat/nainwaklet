/* Nainwak URLs */
var nainwakUrl = 'http://www.nainwak.com/',
    gameUrlRegex = /^https?:\/\/(www\.)?nainwak\.com\/jeu\/index\.php/;

function getPageUrl(page) {
    return '/jeu/' + page + '.php';
}

function getImageUrl(path) {
    return '/images/' + path;
}

module.exports = {
    nainwakUrl: nainwakUrl,
    getPageUrl: getPageUrl,
    getImageUrl: getImageUrl,
    gameUrlRegex: gameUrlRegex
};
