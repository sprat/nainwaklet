/*global
    window, document, alert, XMLHttpRequest
 */

(function () {
    "use strict";

    var console = window.console,
        log = (console)
            ? console.log.bind(console)
            : function () {
                return;
            };

    /*
    function extend(target, source) {
        Object.keys(source).forEach(function (key) {
            if (target[key] === undefined) {
                target[key] = source[key];
            }
        });
    }

    function asyncGet(url, onSuccess, onFailure) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', encodeURI(url), true);  // asynchronous
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {  // response received and loaded
                if (xhr.status === 200) {
                    onSuccess(xhr.responseText, xhr.statusText);
                } else {
                    onFailure(xhr.statusText);
                }
            }
        };
        xhr.send(null);
    }
    */

    function parseUrl(url) {
        var a = document.createElement('a');
        a.href = url;
        return a;
    }

    function parseQueryParams(location) {
        var query = location.search.substr(1),
            pairs = query.split("&"),
            params = {};
        pairs.forEach(function (e) {
            var pair = e.split("="),
                name = decodeURIComponent(pair[0]),
                value = decodeURIComponent(pair[1] || "");
            params[name] = value;
        });
        return params;
    }

    /* Spy "class" */
    function createSpy() {
        // There's also:
        // - http://www.nainwak.com/accueil/resume.php?IDS=...&errmsg=
        var IDS = parseQueryParams(window.location).IDS,
            infoFrame = window.info.frameElement,
            enabled = false,
            infoLoaded = function () {
                var infoDoc = window.info.document,
                    url = infoDoc.location;
                //html = infoDoc.documentElement.innerHTML;
                log("info frame loaded: " + url);
            },
            gameUrl = function (name) {
                return 'http://www.nainwak.com/jeu/' + name + '.php?IDS=' + IDS;
            },
            gameUrls = {
                menu: gameUrl('menu'),  // Menu principal
                pager: gameUrl('pager'),  // Pager : PV/PA, compteur des messages
                pub: gameUrl('pub'),  // Publicités
                map: gameUrl('map'),  // Carte de la détection
                detect: gameUrl('detect'),  // Détection
                deplac: gameUrl('deplac'),  // Action
                invent: gameUrl('invent'),  // Inventaire
                perso: gameUrl('perso'),  // Fiche de perso
                even: gameUrl('even') + "&duree=240&type=ALL",  // événements : tous types d'evts sur 10 jours
                chat: gameUrl('chat'),  // Messagerie
                guilde: gameUrl('guilde'),  // Guilde
                encyclo: gameUrl('encyclo')  // Encyclopédie
            },
            sendUpdate = function () {
                Object.keys(gameUrls).forEach(function (name) {
                    var url = gameUrls[name];
                    log(name + ": " + url);
                });
                //asyncGet(gameUrls.detect, log, log);
            },
            createUI = function () {
                var button = document.createElement("button");
                button.setAttribute("class", "spy");
                button.setAttribute("type", "button");
                button.innerHTML = "Lancer MAJ";
                button.onclick = sendUpdate;
                return button;
            },
            isEnabled = function () {
                return enabled;
            },
            enable = function () {
                if (isEnabled()) {
                    return false;
                }

                infoFrame.addEventListener('load', infoLoaded, false);
                enabled = true;
                return true;
            },
            disable = function () {
                if (!isEnabled()) {
                    return false;
                }

                infoFrame.removeEventListener('load', infoLoaded, false);
                enabled = false;
                return true;
            };

        // TODO: we should implement a getter/setter for the enabled flag
        return Object.freeze({
            isEnabled: isEnabled,
            enable: enable,
            disable: disable,
            createUI: createUI  // TODO: we should not expose that directly
        });
    }

    /* Application "class" */
    function createApplication(container, hubUrl, cssUrl) {
        var spy = createSpy(),  // Spy instance
            containerContent = null,  // initial content of the container
            createHubFrame = function () {
                var iframe = document.createElement("iframe");
                iframe.setAttribute("class", "hub");
                iframe.setAttribute("src", hubUrl);
                return iframe;
            },
            createCssLink = function () {
                var link = document.createElement('link');
                link.setAttribute('rel', 'stylesheet');
                link.setAttribute('type', 'text/css');
                link.setAttribute('href', cssUrl);
                return link;
            },
            createUI = function () {
                var root = document.createElement("div"),
                    spyUI = spy.createUI(),
                    hubFrame;

                root.setAttribute("class", "nainwaklet");

                if (spyUI) {
                    root.appendChild(spyUI);
                }

                hubFrame = createHubFrame();
                root.appendChild(hubFrame);

                return root;
            },
            ui = createUI(),  // application UI
            cssLink = createCssLink(), // application CSS link
            isEnabled = function () {
                return containerContent !== null;
            },
            enable = function () {
                /* This method installs the application UI in the container
                 * element if the application is not already enabled.
                 */
                if (isEnabled()) {
                    return false;
                }

                var doc = container.ownerDocument,
                    head = doc.getElementsByTagName('head')[0];

                // add the CSS element to the head
                head.appendChild(cssLink);

                // backup the initial content
                containerContent = container.innerHTML;

                // replace by our UI
                container.innerHTML = "";
                container.appendChild(ui);

                // enable the spy agent
                spy.enable();

                return true;
            },
            disable = function () {
                /* This method removes the application UI from the container
                 * element and restores its content if the application is enabled.
                 */
                if (!isEnabled()) {
                    return false;
                }

                // disable the spy agent
                spy.disable();

                // restore the initial content
                container.innerHTML = containerContent;
                containerContent = null;

                // remove the CSS element
                cssLink.parentNode.removeChild(cssLink);

                return true;
            };

        // TODO: we should implement a getter/setter for the enabled flag
        return Object.freeze({
            isEnabled: isEnabled,
            enable: enable,
            disable: disable,
            spy: spy
        });
    }

    function isNainwakGamePage() {
        var path = window.location.origin + window.location.pathname;
        return path === "http://www.nainwak.com/jeu/index.php";
    }

    function toggleApp() {
        var currentScript = document.scripts[document.scripts.length - 1],
            scriptLocation = parseUrl(currentScript.src),
            scriptUrl = scriptLocation.origin + scriptLocation.pathname,
            scriptParams = parseQueryParams(scriptLocation),
            cssUrl = scriptUrl.replace('.js', '.css'),
            hubUrl = scriptParams.hub,
            container = window.pub.document.body,
            app = window.nainwakletApp;

        if (!app) {  // app not initialized => create & enable
            app = createApplication(container, hubUrl, cssUrl);
            app.enable();
            window.nainwakletApp = app;
        } else {  // app already initialized => disable & delete
            app.disable();
            delete window.nainwakletApp;
        }
    }

    if (isNainwakGamePage()) {
        toggleApp();
    } else {
        alert("Erreur : ce bouton fonctionne uniquement sur la page jeu de Nainwak");
    }
}());