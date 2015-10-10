define(['./nainwak'], function (nainwak) {
    'use strict';

    function generateHref(scriptUrl, channel) {
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
            'if (u === "' + nainwak.gameUrl() + '") {',
            '    if (s) b.removeChild(s);',
            '    s = d.createElement("script");',
            '    s.id = i;',
            '    s.type = "text/javascript";',
            '    s.src = "' + scriptUrl + '";',
            '    s.async = false;',
            '    s.setAttribute("data-channel", "' + channel + '");',
            '    b.appendChild(s);',
            '} else {',
            '    alert("Erreur : ce script ne fonctionne que dans la partie jeu de Nainwak !");',
            '}',
            '}())'
        ];
        return lines.join('\n').replace(/\s+/g, ' ');
    }

    return {
        generateHref: generateHref
    };
});