/* Initialize the bookmarklet buttons */
define(['./nainwak', './settings'], function (nainwak, settings) {
    function getInjectionUrl(scriptUrl, channel) {
        var lines = [
            'javascript:(function () {',
            '    var w = window,',
            '        l = w.location,',
            '        u = l.origin + l.pathname,',
            '        d = document,',
            '        b = d.body,',
            '        n = "nany",',
            '        i = n + "Script",',
            '        s = d.getElementById(i);',
            '    if (u === "' + nainwak.gameUrl() + '") {',
            '        if (s) b.removeChild(s);',
            '        s = d.createElement("script");',
            '        s.id = i;',
            '        s.type = "text/javascript";',
            '        s.src = "' + scriptUrl + '";',
            '        s.async = false;',
            '        s.setAttribute("data-channel", "' + channel + '");',
            '        b.appendChild(s);',
            '    } else {',
            '        alert("Erreur : ce script ne fonctionne que dans la partie jeu de Nainwak !");',
            '    }',
            '}())'
        ];
        return lines.join('\n').replace(/\s+/g, ' ');
    }

    function initialize(selector) {
        var buttons = document.querySelectorAll(selector || '.nanylet');
        Array.prototype.forEach.call(buttons, function (button) {
            var channel = button.getAttribute('data-channel'),
                href = getInjectionUrl(settings.scriptUrl, channel);
            button.setAttribute('href', href);
        });
    }

    return {
        initialize: initialize
    };
});