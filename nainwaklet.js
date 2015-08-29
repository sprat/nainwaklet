/*global
    window, document, alert, XMLHttpRequest
 */

/* Nainwaklet module
 * Note: when we click on the bookmarklet, the script is reloaded and the
 * module may already be defined... so we don't redefine it in that case!
 */
var Nainwaklet = window.Nainwaklet || (function () {
    "use strict";

    var module = {},  // public API of this module
        nainwakOrigin = 'http://www.nainwak.com',
        script = document.scripts[document.scripts.length - 1],
        scriptUrl = script.src,
        scriptBaseUrl = scriptUrl.substring(0, scriptUrl.lastIndexOf("/") + 1),
        log = (window.console)
            ? window.console.log.bind(window.console)
            : function () {
                return;
            };

    function extend(target, source) {
        Object.keys(source).forEach(function (key) {
            if (target[key] === undefined) {
                target[key] = source[key];
            }
        });
        return target;
    }

    /*
    function asyncGet(url, onSuccess, onFailure) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);  // asynchronous
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

    function parseUrl(url) {
        var a = document.createElement('a');
        a.href = url;
        return a;
    }
    */

    function parseQueryParams(location) {
        var query = location.search.substr(1),
            pairs = query.split("&"),
            params = {};
        // Note: this implementation does not handle duplicate parameters
        // properly, but we don't need that here (yet)
        pairs.forEach(function (e) {
            var pair = e.split("="),
                name = decodeURIComponent(pair[0]),
                value = decodeURIComponent(pair[1] || "");
            params[name] = value;
        });
        return params;
    }

    /* User "class" */
    function createUser(name, avatar, IDS) {
        return Object.freeze({
            name: name,
            avatar: avatar,
            IDS: IDS
        });
    }

    /* Page "class" */
    function createPage(name, analyze) {  /*, fetchParams*/
        var url = nainwakOrigin + '/jeu/' + name + '.php';
        // TODO: add a fetch method
        return Object.freeze({
            name: name,
            url: url,  // base URL without query parameters
            analyze: analyze
        });
    }

    /* pages analyzers */
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

    /* available pages for the Spy objects */
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
        // There's also /accueil/resume.php?IDS=...&errmsg=
    ];

    /* Spy "class" */
    function createSpy(frame) {  /*user, channel*/
        var enabled = false,
            infoLoaded = function () {
                var window = frame.contentWindow,
                    location = window.location,
                    url = location.origin + location.pathname;
                pages.forEach(function (page) {
                    if (page.url === url) {
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

                frame.addEventListener('load', infoLoaded, false);
                enabled = true;
                return true;
            },
            disable = function () {
                if (!isEnabled()) {
                    return false;
                }

                frame.removeEventListener('load', infoLoaded, false);
                enabled = false;
                return true;
            },
            toggle = function () {
                if (isEnabled()) {
                    disable();
                    return false;
                } else {
                    enable();
                    return true;
                }
            };

        // start enabled
        enable();

        // TODO: we should implement a getter/setter for the enabled flag
        return Object.freeze({
            isEnabled: isEnabled,
            enable: enable,
            disable: disable,
            toggle: toggle
        });
    }

    /* Hub "class" */
    function createHub(container) {  /*, user, channel*/
        var containerContent = null,  // original content of the container
            createUI = function () {
                var iframe = document.createElement("iframe"),
                    hubUrl = scriptBaseUrl + 'hub.html';
                iframe.setAttribute("class", "nainwaklet-hub");
                iframe.setAttribute("src", hubUrl);
                iframe.style.width = '100%';
                return iframe;
            },
            /*
            createCssLink = function () {
                var link = document.createElement('link'),
                    cssUrl = scriptUrl.replace('.js', '.css');
                link.setAttribute('rel', 'stylesheet');
                link.setAttribute('type', 'text/css');
                link.setAttribute('href', cssUrl);
                return link;
            },
            */
            ui = createUI(),  // hub UI
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

                //var doc = container.ownerDocument;
                //    head = doc.getElementsByTagName('head')[0]

                // add the CSS element to the head
                //head.appendChild(cssLink);

                // backup the initial content
                containerContent = container.innerHTML;

                // replace by our UI
                container.innerHTML = "";
                container.appendChild(ui);

                return true;
            },
            disable = function () {
                /* This method removes the application UI from the container
                 * element and restores its content if the application is enabled.
                 */
                if (!isEnabled()) {
                    return false;
                }

                // restore the initial content
                container.innerHTML = containerContent;
                containerContent = null;

                // remove the CSS element
                //cssLink.parentNode.removeChild(cssLink);

                return true;
            },
            toggle = function () {
                if (isEnabled()) {
                    disable();
                    return false;
                } else {
                    enable();
                    return true;
                }
            };

        // start enabled
        enable();

        // TODO: we should implement a getter/setter for the enabled flag
        return Object.freeze({
            isEnabled: isEnabled,
            enable: enable,
            disable: disable,
            toggle: toggle
        });
    }

    function getNainwakUser() {
        /* Get the Nainwak User info from the menu frame */
        var frame = window.frames.menu,
            doc = frame.document,
            location = frame.location,
            title = doc.querySelector('.news-titre'),
            name = title.querySelector('td:last-child').innerHTML,
            avatar = title.querySelector('td:first-child img').src,
            IDS = parseQueryParams(location).IDS;
        return createUser(name, avatar, IDS);
    }

    function getDefaultInitSpec() {
        var spec = {},
            loc = window.location,
            currentUrl = loc.origin + loc.pathname,
            nainwakGameUrl = nainwakOrigin + "/jeu/index.php";

        spec.channel = script.getAttribute('data-channel') || 'default';
        if (currentUrl === nainwakGameUrl) {
            spec.user = getNainwakUser();
            spec.hubContainer = window.frames.pub.document.body;
            spec.spyFrame = window.frames.info.frameElement;
        } else {
            spec.user = createUser('anonymous');
            spec.hubContainer = window.document.body;
        }
        return spec;
    }

    function init(spec) {
        var _spec = extend(getDefaultInitSpec(), spec || {}),
            user = _spec.user,
            channel = _spec.channel,
            hubContainer = _spec.hubContainer,
            spyFrame = _spec.spyFrame;

        if (hubContainer) {
            module.hub = createHub(hubContainer, user, channel);
        }

        if (spyFrame) {
            module.spy = createSpy(spyFrame, user, channel);
        }

        module.destroy = function () {
            if (module.spy) {
                module.spy.disable();
                delete module.spy;
            }

            if (module.hub) {
                module.hub.disable();
                delete module.hub;
            }

            delete module.destroy;
            module.init = init;
        };

        // remove the init function from the module API
        delete module.init;
    }

    // define the module public API
    module.init = init;
    return module;
}());

if (Nainwaklet.init) {
    Nainwaklet.init();
} else {
    Nainwaklet.destroy();
}
