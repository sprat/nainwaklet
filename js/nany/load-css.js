var currentScript = require('./current-script'),
    cssUrl = currentScript.src.replace(/\bjs\b/g, 'css');

function loadCSS(doc) {
    var linkId = 'nanyCSS',
        link = doc.getElementById(linkId),
        head = doc.getElementsByTagName('head')[0];

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
