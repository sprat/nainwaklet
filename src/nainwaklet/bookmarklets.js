/* Initialize the bookmarklet buttons */
define(['./nainwak', './config'], function (nainwak, config) {
    function getInjectionUrl(scriptUrl, channel) {
        var lines = [
            'javascript:(function () {',
            '    var w = window,',
            '        l = w.location,',
            '        u = l.origin + l.pathname,',
            '        d = document,',
            '        b = d.body,',
            '        n = "nainwaklet",',
            '        i = n + "Script",',
            '        s = d.getElementById(i);',
            '    if (u === "' + nainwak.gameUrl() + '") {',
            '        if (s) {',
            '            w[n].hub.destroy();',
            '            w[n] = null;',
            '            b.removeChild(s);',
            '        } else {',
            '            s = d.createElement("script");',
            '            s.id = i;',
            '            s.type = "text/javascript";',
            '            s.src = "' + scriptUrl + '";',
            '            s.async = false;',
            '            s.setAttribute("data-channel", "' + channel + '");',
            '            b.appendChild(s);',
            '        }',
            '    } else {',
            '        alert("Ne fonctionne que sur Nainwak ! Vous devez être connecté à votre nain dans le jeu.");',
            '    }',
            '}())'
        ];
        return lines.join('\n').replace(/\s+/g, ' ');
    }

    function initialize(selector) {
        var buttons = document.querySelectorAll(selector || '.nainwaklet');
        Array.prototype.forEach.call(buttons, function (button) {
            var channel = button.getAttribute('data-channel'),
                href = getInjectionUrl(config.scriptUrl, channel);
            button.setAttribute('href', href);
        });
    }

    return {
        initialize: initialize
    };
});