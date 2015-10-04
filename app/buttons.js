/* Initialize the bookmarklet buttons */
define(['./nainwak'], function (nainwak) {
    function getInjectionUrl(scriptUrl, channel) {
        var lines = [
            'javascript:(function () {',
            '    var w = window,',
            '        l = w.location,',
            '        u = l.origin + l.pathname,',
            '        d = document,',
            '        b = d.body,',
            '        n = "Nainwaklet",',
            '        i = n + "Script",',
            '        s = d.getElementById(i);',
            '    if (u === "' + nainwak.gameUrl() + '") {',
            '        if (s) {',
            '            w[n].app.destroy();',
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

    function initialize(scriptUrl, buttons) {
        buttons = buttons || document.querySelectorAll('.nainwaklet-button');
        Array.prototype.forEach.call(buttons, function (button) {
            var channel = button.getAttribute('data-channel'),
                href = getInjectionUrl(scriptUrl, channel);
            button.setAttribute('href', href);
        });
    }

    return {
        initialize: initialize
    };
});