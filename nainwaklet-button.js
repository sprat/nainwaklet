/*global
    window, document
 */
(function (exports) {
    "use strict";

    var scriptUrl = document.scripts[document.scripts.length - 1].src,
        baseUrl = scriptUrl.substring(0, scriptUrl.lastIndexOf('/') + 1),
        nainwakletUrl = baseUrl + "nainwaklet.js",
        defaultHubUrl = baseUrl + "hub.html";

    function getNainwakletInjectionCode(hubUrl) {
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
                s.setAttribute('id', id);
                b.appendChild(s);
            },
            hubParam = encodeURIComponent(hubUrl || defaultHubUrl),
            url = nainwakletUrl + '?hub=' + hubParam,
            code = template.toString()
                .replace(/\s+/g, ' ')
                .replace('@src@', url);

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