/*global
    window, document
 */
(function (exports) {
    "use strict";

    function getBaseUrl() {
        var scriptUrl = document.scripts[document.scripts.length - 1].src;
        return scriptUrl.substring(0, scriptUrl.lastIndexOf('/') + 1);
    }

    function initNainwakletButton(id, nainwakletPath) {
        var button = document.getElementById(id),
            scriptUrl = baseUrl + (nainwakletPath || "nainwaklet.js"),
            href = "javascript:(function(){var%20d=document,%20b=d.body,%20s=d.getElementById('nainwaklet_js');"
                    + "if%20(s)%20b.removeChild(s);"
                    + "s=d.createElement('script');"
                    + "s.setAttribute('id','nainwaklet_js');"
                    + "s.setAttribute('src','" + scriptUrl + "');"
                    + "b.appendChild(s);}());";
        button.setAttribute("href", href);
    }

    var baseUrl = getBaseUrl();
    exports.initNainwakletButton = initNainwakletButton;
}(window));