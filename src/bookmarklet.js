var Urls = require('./urls');
var currentScript = require('./current-script');
var getDataset = require('get-dataset');

function setHref(link, scriptUrl, config) {
    // TODO: maybe we can use a template and the text plugin here?
    var lines = [
        'javascript:(function(src, conf) {',
        'var w=window, l=w.location, d=w.document, b=d.body, s;',
        'if (!' + Urls.gameUrlRegex + '.test(l.href)) {',
        '  alert("Connectez-vous sur Nainwak puis cliquez sur « Jouer ! » avant d\'utiliser le Nany");',
        '  l.assign("' + Urls.nainwakUrl + '");',
        '  return;',
        '}',
        's=d.createElement("script");',
        's.type="text/javascript";',
        's.src=src;',
        's.charset="utf-8";',
        's.onload=function() {',
        '  Nany.run(conf);',
        '  b.removeChild(s);',
        '};',
        'b.appendChild(s);',
        '}("' + scriptUrl + '", ' + JSON.stringify(config) + '))'
    ];
    var href = lines.join('\n').replace(/\s+/g, ' ');
    link.href = href;
    return link;
}

// initialize the bookmarklets links
function initialize(selector, config, scriptUrl) {
    selector = selector || '.nany-bookmarklet';
    scriptUrl = scriptUrl || currentScript.src;

    var links = document.querySelectorAll(selector);
    Array.prototype.forEach.call(links, function (link) {
        var conf = config || getDataset(link);
        setHref(link, scriptUrl, conf);
    });
}

module.exports = {
    initialize: initialize
};
