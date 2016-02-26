var urls = require('./urls');

function generateHref(scriptUrl, button) {
    var channel = button.getAttribute('data-channel'),
        ringUpdateUrl = button.getAttribute('data-ring-update-url') || '';

    // TODO: maybe we can use a template and the text plugin here?
    var lines = [
        'javascript:(function () {',
        'var u = window.location.href,',
        '    d = document,',
        '    b = d.body,',
        '    i = "nanyScript",',
        '    s = d.getElementById(i);',
        'if (' + urls.gameUrlRegex + '.test(u)) {',
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
        '    alert("Erreur : le nany ne fonctionne que dans la partie jeu de Nainwak !");',
        '}',
        '}())'
    ];
    return lines.join('\n').replace(/\s+/g, ' ');
}

module.exports = {
    generateHref: generateHref
};
