var urls = require('./urls');


function generateHref(scriptUrl, button) {
    var channel = button.getAttribute('data-channel'),
        ringUpdateUrl = button.getAttribute('data-ring-update-url') || '';

    // TODO: maybe we can use a template and the text plugin here?
    var lines = [
        'javascript:(function () {',
        'var w = window,',
        '    l = w.location,',
        '    u = l.origin + l.pathname,',
        '    d = document,',
        '    b = d.body,',
        '    n = "nany",',
        '    i = n + "Script",',
        '    s = d.getElementById(i);',
        'if (u === "' + urls.gameUrl + '") {',
        '    if (s) b.removeChild(s);',
        '    s = d.createElement("script");',
        '    s.id = i;',
        '    s.type = "text/javascript";',
        '    s.src = "' + scriptUrl + '";',
        '    s.async = false;',
        '    s.setAttribute("data-channel", "' + channel + '");',
        '    s.setAttribute("data-ring-update-url", "' + ringUpdateUrl + '");',
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
