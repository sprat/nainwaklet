var urls = require('./urls');

function setHref(button, scriptUrl) {
    var channel = button.getAttribute('data-channel'),
        ringUpdateUrl = button.getAttribute('data-ring-update-url') || '';

    // TODO: maybe we can use a template and the text plugin here?
    var lines = [
        'javascript:(function () {',
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
        '    s.setAttribute("data-channel", "' + channel + '");',
        '    s.setAttribute("data-ring-update-url", "' + ringUpdateUrl + '");',
        '    s.setAttribute("charset", "utf-8");',
        '    b.appendChild(s);',
        '} else {',
        '    alert("Connectez-vous sur Nainwak puis cliquez sur « Jouer ! » avant d\'utiliser le Nany");',
        '    l.assign("' + urls.nainwakUrl + '");',
        '}',
        '}())'
    ];  //alert("Erreur : le nany ne fonctionne que dans la partie jeu de Nainwak !");',
    var href = lines.join('\n').replace(/\s+/g, ' ');
    button.setAttribute('href', href);
    return button;
}

module.exports = {
    setHref: setHref
};
