/* Application URLs */
var scripts = document.scripts;
var currentScript = scripts[scripts.length - 1];
var scriptUrl = currentScript.src;
var cssUrl = scriptUrl.replace(/\bjs\b/g, 'css');

module.exports = {
    scriptUrl: scriptUrl,
    cssUrl: cssUrl
};
