/*global
    window, document, alert, XMLHttpRequest
 */

/* Nainwaklet module */
var Nainwaklet = (function () {
    "use strict";

    var nainwakOrigin = 'http://www.nainwak.com',
        nainwakGameUrl = nainwakOrigin + '/jeu/index.php',
        script = document.scripts[document.scripts.length - 1],
        scriptUrl = script.src,
        scriptBaseUrl = scriptUrl.substring(0, scriptUrl.lastIndexOf("/") + 1),
        scriptChannel = script.getAttribute('data-channel'),
        log = (window.console)
            ? window.console.log.bind(window.console)
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
        return target;
    }

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
                iframe.style.border = 0;
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

    /* Application "class" */
    function createApplication(conf) {
        var _conf = conf || {},
            user = _conf.user || createUser('anonymous'),
            channel = _conf.channel || scriptChannel || 'default',
            container = _conf.container || window.document.body,
            spyFrame = _conf.spyFrame,
            hub,
            spy;

        if (container) {
            hub = createHub(container, user, channel);
        }

        if (spyFrame) {
            spy = createSpy(spyFrame, user, channel);
        }

        function destroy() {
            if (spy) {
                spy.disable();
            }

            if (hub) {
                hub.disable();
            }
        }

        return Object.freeze({
            hub: hub,
            spy: spy,
            destroy: destroy
        });
    }

    function getInjectionUrl(channel) {
        var template = function () {
                var w = window,
                    l = w.location,
                    u = l.origin + l.pathname,
                    d = document,
                    b = d.body,
                    n = 'Nainwaklet',
                    id = 'nainwakletScript',
                    s = d.getElementById(id);

                if (u === '@gameUrl@') {
                    if (s) {
                        w[n].app.destroy();
                        w[n] = null;
                        b.removeChild(s);
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
                .replace('@gameUrl@', nainwakGameUrl)
                .replace('@src@', scriptUrl)
                .replace('@channel@', channel);

        return 'javascript:(' + code + '())';
    }

    function initializeButtons(buttons) {
        var _buttons = buttons || document.querySelectorAll('.nainwaklet-button');
        Array.prototype.forEach.call(_buttons, function (button) {
            var channel = button.getAttribute('data-channel'),
                href = getInjectionUrl(channel);
            button.setAttribute("href", href);
        });
    }

    function createApplicationOnNainwak(api) {
        var loc = window.location,
            currentUrl = loc.origin + loc.pathname;

        if (currentUrl === nainwakGameUrl) {
            api.app = createApplication({
                user: getNainwakUser(),
                container: window.frames.pub.document.body,
                spyFrame: window.frames.info.frameElement
            });
        }
    }

    // module public API
    var api = {
        createApplication: createApplication,
        initializeButtons: initializeButtons
    };
    createApplicationOnNainwak(api);
    return Object.freeze(api);
}());
