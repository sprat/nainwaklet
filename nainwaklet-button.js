/*global
    window, document
 */
(function (exports) {
    "use strict";

    var scriptUrl = document.scripts[document.scripts.length - 1].src,
        baseUrl = scriptUrl.substring(0, scriptUrl.lastIndexOf('/') + 1),
        nainwakletJs = baseUrl + "nainwaklet.js",
        defaultHubUrl = baseUrl + "hub.html";

    function initNainwakletButton(id, hubUrl) {
        var button = document.getElementById(id),
            hub = hubUrl || defaultHubUrl,
            href = "javascript:(function(){var%20d=document,b=d.body,s=d.getElementById('nainwaklet_js');"
                    + "if%20(s)%20b.removeChild(s);"
                    + "s=d.createElement('script');"
                    + "s.setAttribute('id','nainwaklet_js');"
                    + "s.setAttribute('src','" + nainwakletJs + "');"
                    + "s.setAttribute('data-hub','" + hub + "');"
                    + "b.appendChild(s);}());";
        button.setAttribute("href", href);
    }

    // exports
    exports.initNainwakletButton = initNainwakletButton;
}(window));