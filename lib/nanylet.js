var urls = require('./urls'),
    getDataset = require('get-dataset');

function setHref(button, scriptUrl) {
    var config = getDataset(button);

    // TODO: maybe we can use a template and the text plugin here?
    var lines = [
        'javascript:(function (conf) {',
        'var l = window.location,',
        '    d = document,',
        '    b = d.body,',
        '    i = "nanyScript",',
        '    s = d.getElementById(i);',
        'if (' + urls.gameUrlRegex + '.test(l.href)) {',
        '    if (s) s.parentNode.removeChild(s);',
        '    s = d.createElement("script");',
        '    s.id = i;',
        '    s.type = "text/javascript";',
        '    s.src = "' + scriptUrl + '";',
        '    s.async = false;',
        '    s.text = JSON.stringify(conf);',
        '    s.charset = "utf-8";',
        '    b.appendChild(s);',
        '} else {',
        '    alert("Connectez-vous sur Nainwak puis cliquez sur « Jouer ! » avant d\'utiliser le Nany");',
        '    l.assign("' + urls.nainwakUrl + '");',
        '}',
        '}(' + JSON.stringify(config) + '))'
    ];
    var href = lines.join('\n').replace(/\s+/g, ' ');
    button.setAttribute('href', href);
    return button;
}

module.exports = {
    setHref: setHref
};
