/*global
    window, document
 */
(function (exports) {
    "use strict";

    var scriptUrl = document.scripts[document.scripts.length - 1].src,
        baseUrl = scriptUrl.substring(0, scriptUrl.lastIndexOf('/') + 1),
        nainwakletUrl = baseUrl + "nainwaklet.js";

    function getNainwakletInjectionUrl(channel) {
        var template = function () {
                var d = document,
                    b = d.body,
                    id = "nainwakletScript",
                    s = d.getElementById(id);
                if (s) {
                    b.removeChild(s);
                }
                s = d.createElement('script');
                s.setAttribute('type', 'text/javascript');
                s.setAttribute('src', '@src@');
                s.setAttribute('data-channel', '@channel@');
                s.setAttribute('id', id);
                b.appendChild(s);
            },
            code = template.toString()
                .replace(/\s+/g, ' ')
                .replace('@src@', nainwakletUrl)
                .replace('@channel@', channel);

        return 'javascript:(' + code + '())';
    }

    function initNainwakletButtons() {
        var buttons = document.querySelectorAll('.nainwaklet-button');

        Array.prototype.forEach.call(buttons, function(button) {
            var channel = button.getAttribute('data-channel'),
                href = getNainwakletInjectionUrl(channel);
            button.setAttribute("href", href);
        });
    }

    // exports
    exports.initNainwakletButtons = initNainwakletButtons;
}(window));