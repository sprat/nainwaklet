var urls = require('./urls'),
    script = require('./script'),
    getDataset = require('get-dataset');


function setHref(link, scriptUrl) {
    var config = getDataset(link);

    // TODO: maybe we can use a template and the text plugin here?
    var lines = [
        'javascript:(function (src, conf) {',
        'var w=window, l=w.location, d=w.document, b=d.body, s;',
        'if (!' + urls.gameUrlRegex + '.test(l.href)) {',
        '  alert("Connectez-vous sur Nainwak puis cliquez sur « Jouer ! » avant d\'utiliser le Nany");',
        '  l.assign("' + urls.nainwakUrl + '");',
        '  return;',
        '}',
        's=d.createElement("script");',
        's.type="text/javascript";',
        's.src=src;',
        's.text=JSON.stringify(conf);',
        's.charset="utf-8";',
        's.onload=function() {',
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
function initialize(selector, scriptUrl) {
    var links = document.querySelectorAll(selector || '.nany-bookmarklet');

    Array.prototype.forEach.call(links, function (link) {
        setHref(link, scriptUrl || script.url);
    });
}


module.exports = {
    initialize: initialize
};
