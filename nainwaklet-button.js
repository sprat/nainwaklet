/*global
    window, document
 */
(function (exports) {
    "use strict";

    var scriptUrl = document.scripts[document.scripts.length - 1].src,
        baseUrl = scriptUrl.substring(0, scriptUrl.lastIndexOf('/') + 1),
        defaultHubUrl = baseUrl + "hub.html",
        defaultNainwakletUrl = baseUrl + "nainwaklet.js";

    function initNainwakletButton(id, hubUrl, nainwakletUrl) {
        var button = document.getElementById(id),
            src = (nainwakletUrl || defaultNainwakletUrl),
            hub = (hubUrl || defaultHubUrl),
            href = "javascript:(function(){var%20d=document,%20b=d.body,%20s=d.getElementById('nainwaklet_js');"
                    + "if%20(s)%20b.removeChild(s);"
                    + "s=d.createElement('script');"
                    + "s.setAttribute('id','nainwaklet_js');"
                    + "s.setAttribute('src','" + src + "');"
                    + "s.setAttribute('data-hub','" + hub + "');"
                    + "b.appendChild(s);}());";
        button.setAttribute("href", href);
    }

    // exports
    exports.initNainwakletButton = initNainwakletButton;
}(window));