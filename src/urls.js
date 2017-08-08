/* Nainwak URLs */
var nainwakUrl = 'http://www.nainwak.com';
var gameUrlRegex = /^https?:\/\/(www\.)?nainwak\.com\/jeu\/index\.php/;

/* Application URLs */
var scripts = document.scripts;
var currentScript = scripts[scripts.length - 1];
var applicationScriptUrl = currentScript.src;
var applicationCssUrl = applicationScriptUrl.replace(/\bjs\b/g, 'css');

module.exports = {
    nainwakUrl: nainwakUrl,
    gameUrlRegex: gameUrlRegex,
    applicationScriptUrl: applicationScriptUrl,
    applicationCssUrl: applicationCssUrl
};
