var scripts = document.scripts,
    currentScript = scripts[scripts.length - 1],
    url = currentScript.src,
    // take the current script URL and replace the .js extension by .css
    cssUrl = url.replace(/\bjs\b/g, 'css');

function getParameter(name) {
    return currentScript.getAttribute('data-' + name);
}

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

module.exports = {
    url: url,
    getParameter: getParameter,
    loadCSS: loadCSS
};
