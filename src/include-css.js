var currentScript = require('./current-script');
var cssUrl = currentScript.src.replace(/\bjs\b/g, 'css');

function loadCSS(doc) {
    var linkId = 'nanyCSS';
    var link = doc.getElementById(linkId);
    var head = doc.getElementsByTagName('head')[0];

    // insert the CSS file if needed (we never remove it!)
    if (!link) {
        link = doc.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('type', 'text/css');
        link.setAttribute('href', cssUrl);
        link.setAttribute('id', linkId);
        head.appendChild(link);
    }
}

module.exports = loadCSS;
