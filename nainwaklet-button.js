/*global
    window, document
 */
(function (exports) {
    "use strict";

    var scriptUrl = document.scripts[document.scripts.length - 1].src,
        baseUrl = scriptUrl.substring(0, scriptUrl.lastIndexOf('/') + 1),
        jsUrl = baseUrl + "nainwaklet.js",
        defaultHubUrl = baseUrl + "hub.html";

    function getNainwakletInjectionCode(hubUrl) {
        var template = function () {
                var d = document,
                    b = d.body,
                    s = d.querySelector("script[data-nainwaklet-hub]");
                if (s) {
                    b.removeChild(s);
                }
                s = d.createElement('script');
                s.setAttribute('type', 'text/javascript');
                s.setAttribute('src', '@js@');
                s.setAttribute('data-nainwaklet-hub', '@hub@');
                b.appendChild(s);
            },
            code = template.toString()
                .replace(/\s+/g, ' ')
                .replace('@js@', jsUrl)
                .replace('@hub@', hubUrl || defaultHubUrl);

        return 'javascript:(' + code + '())';
    }

    function initNainwakletButton(id, hubUrl) {
        var button = document.getElementById(id),
            href = getNainwakletInjectionCode(hubUrl);
        button.setAttribute("href", href);
    }

    // exports
    exports.initNainwakletButton = initNainwakletButton;
}(window));