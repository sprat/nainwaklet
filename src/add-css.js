var urls = require('./urls');

function addCSS(doc) {
    var linkId = 'nanyCSS';
    var link = doc.getElementById(linkId);
    var head = doc.getElementsByTagName('head')[0];

    // insert the CSS file if needed (we never remove it!)
    if (!link) {
        link = doc.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('type', 'text/css');
        link.setAttribute('href', urls.applicationCssUrl);
        link.setAttribute('id', linkId);
        head.appendChild(link);
    }

    return function removeCSS() {
        head.removeChild(link);
    };
}

module.exports = addCSS;
