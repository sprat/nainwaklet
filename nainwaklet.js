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

    function currentNain() {
        // get the current "Nain" info from the menu frame
        var menuDoc = window.menu.document,
            title = menuDoc.querySelector('.news-titre'),
            name = title.querySelector('td:last-child').innerHTML,
            avatar = title.querySelector('td:first-child img').src;
        // TODO: we should introduce a "Nain" class here, which would be used
        // when we analyze the detect page
        return Object.freeze({
            name: name,
            avatar: avatar
        });
    }

    function createPage(name, analyze) {  /*, fetchParams*/
        var baseUrl = 'http://www.nainwak.com/jeu/' + name + '.php';
        // TODO: add a fetch method
        return Object.freeze({
            name: name,
            baseUrl: baseUrl,
            analyze: analyze
        });
    }

    function analyzeDetect(window) {
        var document = window.document,
            c1 = document.getElementsByClassName('c1')[0];
        log('Processing detect...');
        //log(document);
        log(c1);
        //log(window.tabavat);
        //gavat(id, photo, nom, tag, barbe, classe, cote, distance, x, y, description, attaquer, gifler, estCible)
        //log(window.tabobjet);
        //gobjet(id, photo, nom, distance, x, y, poussiere, prendre)
    }

    var pages = [
        // Détection
        createPage('detect', analyzeDetect)
        /*
        // Evénements (tous types d'evts sur 10 jours)
        createPage('even', log, {duree: 240, type: 'ALL'}),
        // Fiche de perso
        createPage('perso', log),
        // Inventaire
        createPage('invent', log),
        // Encyclopédie
        createPage('encyclo', log)
        */
    ];

    /* Spy "class" */
    function createSpy(nain) {
        // There's also:
        // - http://www.nainwak.com/accueil/resume.php?IDS=...&errmsg=
        var infoFrame = window.info.frameElement,
            enabled = false,
            //IDS = parseQueryParams(window.location).IDS,
            infoLoaded = function () {
                var window = infoFrame.contentWindow,
                    location = window.location,
                    baseUrl = location.origin + location.pathname;
                pages.forEach(function (page) {
                    if (page.baseUrl === baseUrl) {
                        page.analyze(window);
                    }
                });
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

        log(nain);

        // TODO: we should implement a getter/setter for the enabled flag
        return Object.freeze({
            isEnabled: isEnabled,
            enable: enable,
            disable: disable
        });
    }

    /* Application "class" */
    function createApplication(container, hubUrl, cssUrl) {
        var nain = currentNain(),  // current Nain
            spy = createSpy(nain),  // Spy instance
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
                    hubFrame = createHubFrame();

                root.setAttribute("class", "nainwaklet");
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