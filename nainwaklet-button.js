/*global
    window, document, alert
 */
var NainwakletButton = (function () {
    "use strict";

    var scriptUrl = document.scripts[document.scripts.length - 1].src,
        baseUrl = scriptUrl.substring(0, scriptUrl.lastIndexOf('/') + 1),
        nainwakletUrl = baseUrl.replace(/^https?:/, '') + "nainwaklet.js";

    function getNainwakletInjectionUrl(channel) {
        var template = function () {
                var w = window,
                    l = w.location,
                    d = w.document,
                    u = l.origin + l.pathname,
                    b = d.body,
                    n = 'Nainwaklet',
                    id = n + '-script',
                    s = d.getElementById(id);

                if (u === 'http://www.nainwak.com/jeu/index.php') {
                    if (s) {
                        b.removeChild(s);
                        w[n].destroy();
                        w[n] = undefined;
                    } else {
                        s = d.createElement('script');
                        s.id = id;
                        s.type = 'text/javascript';
                        s.src = '@src@';
                        s.async = false;
                        s.setAttribute('data-channel', '@channel@');
                        b.appendChild(s);
                    }
                } else {
                    alert("Ne fonctionne que sur la page jeu de Nainwak");
                }
            },
            code = template.toString()
                .replace(/\s+/g, ' ')
                .replace('@src@', nainwakletUrl)
                .replace('@channel@', channel);

        return 'javascript:(' + code + '())';
    }

    function init() {
        console.log('initializing the buttons')
        var buttons = document.querySelectorAll('.nainwaklet-button');

        Array.prototype.forEach.call(buttons, function (button) {
            var channel = button.getAttribute('data-channel'),
                href = getNainwakletInjectionUrl(channel);
            button.setAttribute("href", href);
        });
    }

    // module public API
    return {
        init: init
    };
}());