/*global
    window, document, alert, XMLHttpRequest
 */

/* Nainwaklet module */
var Nainwaklet = (function () {
    'use strict';

    var nainwakOrigin = 'http://www.nainwak.com',
        nainwakGameUrl = nainwakOrigin + '/jeu/index.php',
        script = document.scripts[document.scripts.length - 1],
        scriptUrl = script.src,
        scriptBaseUrl = scriptUrl.substring(0, scriptUrl.lastIndexOf('/') + 1),
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

    function parseQueryParams(location) {
        var query = location.search.substr(1),
            pairs = query.split('&'),
            params = {};
        // Note: this implementation does not handle duplicate parameters
        // properly, but we don't need that here (yet)
        pairs.forEach(function (e) {
            var pair = e.split('='),
                name = decodeURIComponent(pair[0]),
                value = decodeURIComponent(pair[1] || '');
            params[name] = value;
        });
        return params;
    }
    */

    function generateRandomGuestName() {
        var id = Math.floor(Math.random() * 1000);
        return 'guest' + id;
    }

    /* User factory */
    function createUser(name, avatar) {
        var defaultAvatar = scriptBaseUrl + 'avatar.png';
        return Object.freeze({
            name: name || generateRandomGuestName(),
            avatar: avatar || defaultAvatar
        });
    }

    /* Page factory */
    function createPage(name, analyze) {  /*, loadParams*/
        var url = nainwakOrigin + '/jeu/' + name + '.php';
        // TODO: add a load method
        return Object.freeze({
            name: name,
            url: url,  // base URL without query parameters
            analyze: analyze
        });
    }

    /* detect page */
    var detect = (function () {
        function findLocalization(html) {
            // example:
            // <span class="c1">Position (13,5) sur "Ronain Graou" |b95eb2f716c500db6|</span>
            var re = /<span\sclass="c1">Position\s\((\d*),(\d*)\)\ssur\s"([^"]*)"/im,
                match = re.exec(html);
            if (match) {
                return {
                    position: [match[1], match[2]],
                    world: match[3]
                };
            }
        }

        function findDwarfs(html) {
            // example:
            // tabavat[1] = ["33966", "avatar_guilde/41ddb8ad2c2be408e27352accf1cc0b6559466bb.png", "Le PheniX", '[Gnouille] [<span style="color:#91005D;">#!</span>]', "13794", "2", "Diablotin(e)", "0", "13", "5", "&quot;Le PheniX est un oiseau qui symbolise l&#039;immortalité et la résurrection.&quot; A quoi bon me tuer ?!?", "o", "", "0"];
            // (id, photo, nom, tag, barbe, classe, cote, distance, x, y, description, attaquer, gifler, estCible)
            var dwarfs = [];
            // TODO: not implemented
            return dwarfs;
        }

        function findObjects(html) {
            // example:
            // tabobjet[1] = [3609504, "objets/oreiller.gif", "Oreiller", 1, 12, 5, "ARME", 1262774];
            // (id, photo, nom, distance, x, y, poussiere, prendre)
            var objects = [];
            // TODO: not implemented
            return objects;
        }

        function analyze(html) {
            log('Analyzing detect...');
            return {
                localization: findLocalization(html),
                dwarfs: findDwarfs(html),
                objects: findObjects(html)
            };
        }

        return createPage('detect', analyze);
    }());

    /* pages */
    var pages = (function () {
        var list = [
                detect
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
            ],
            get = function (nameOrUrl) {
                var results = list.filter(function (page) {
                    return (page.name === nameOrUrl) || (page.url === nameOrUrl);
                });

                if (results) {
                    return results[0];
                }
            };

        return Object.freeze({
            get: get,
            list: list
        });
    }());

    /* Spy factory */
    function createSpy(frame) {  /*user, channel*/
        //IDS = parseQueryParams(frame.location).IDS,
        var infoLoaded = function () {
                var contentWindow = frame.contentWindow,
                    doc = contentWindow.document,
                    docEl = doc.documentElement,
                    html = docEl.outerHTML,  // no doctype but we don't mind
                    location = contentWindow.location,
                    url = location.origin + location.pathname,
                    page = pages.get(url),
                    result;

                if (page) {
                    result = page.analyze(html);
                    log(result);
                }
            },
            enabled = false,
            enable = function (value) {
                var oldEnabled = enabled;

                // update the status (and convert to boolean, just in case)
                enabled = !!value;

                if (oldEnabled === enabled) {  // nothing to do
                    return;
                }

                // register or unregister the load event handler
                if (enabled) {
                    frame.addEventListener('load', infoLoaded, false);
                } else {
                    frame.removeEventListener('load', infoLoaded, false);
                }
            };

        // start enabled
        enable(true);

        return Object.freeze({
            get enabled() {
                return enabled;
            },
            set enabled(value) {
                enable(value);
            }
        });
    }

    /* Hub factory */
    function createHub(container) {  /*, user, channel*/
        var containerContent = null,  // original content of the container
            ui = (function () {  // create the hub UI
                var iframe = document.createElement('iframe'),
                    hubUrl = scriptBaseUrl + 'hub.html';
                iframe.setAttribute('class', 'nainwaklet-hub');
                iframe.setAttribute('src', hubUrl);
                iframe.style.width = '100%';
                iframe.style.border = 0;
                return iframe;
            }()),
            /*
            cssLink = (function () {
                var link = document.createElement('link'),
                    cssUrl = scriptUrl.replace('.js', '.css');
                link.setAttribute('rel', 'stylesheet');
                link.setAttribute('type', 'text/css');
                link.setAttribute('href', cssUrl);
                return link;
            }()),
            */
            enabled = false,
            enable = function (value) {
                var oldEnabled = enabled;

                // update the status (and convert to boolean, just in case)
                enabled = !!value;

                if (enabled === oldEnabled) {  // nothing to do
                    return;
                }

                if (enabled) {
                    //var doc = container.ownerDocument;
                    //    head = doc.getElementsByTagName('head')[0]

                    // add the CSS element to the head
                    //head.appendChild(cssLink);

                    // backup the initial content
                    containerContent = container.innerHTML;

                    // replace by our UI
                    container.innerHTML = '';
                    container.appendChild(ui);
                } else {
                    // restore the initial content
                    container.innerHTML = containerContent;
                    containerContent = null;

                    // remove the CSS element
                    //cssLink.parentNode.removeChild(cssLink);
                }
            };

        // start enabled
        enable(true);

        return Object.freeze({
            get enabled() {
                return enabled;
            },
            set enabled(value) {
                enable(value);
            }
        });
    }

    /* Application factory */
    function createApplication(conf) {
        var _conf = conf || {},
            user = _conf.user || createUser(),
            channel = _conf.channel || scriptChannel || 'default',
            container = _conf.container || window.document.body,
            spyFrame = _conf.spyFrame,  // should be the frame element
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
                spy.enabled = false;
            }

            if (hub) {
                hub.enabled = false;
            }
        }

        return Object.freeze({
            user: user,
            hub: hub,
            spy: spy,
            destroy: destroy
        });
    }

    /* Check if we are on the Nainwak game page */
    function isOnNainwakGame() {
        var loc = window.location,
            pageUrl = loc.origin + loc.pathname;
        return pageUrl === nainwakGameUrl;
    }

    /* Get the Nainwak User info from the menu frame */
    function getNainwakUser() {
        var frame = window.frames.menu,
            doc = frame.document,
            title = doc.querySelector('.news-titre'),
            name = title.querySelector('td:last-child').innerHTML,
            avatar = title.querySelector('td:first-child img').src;
        return createUser(name, avatar);
    }

    function augmentApiOnNainwakGame(api) {
        if (isOnNainwakGame()) {
            // augment the API with an application object tailored for the Nainwak game
            api.app = createApplication({
                user: getNainwakUser(),
                container: window.frames.pub.document.body,
                spyFrame: window.frames.info.frameElement
            });
        }
    }

    /********************/
    /* Bookmarklet part */
    /********************/
    function getInjectionUrl(channel) {
        var lines = [
            'javascript:(function () {',
            '    var w = window,',
            '        l = w.location,',
            '        u = l.origin + l.pathname,',
            '        d = document,',
            '        b = d.body,',
            '        n = "Nainwaklet",',
            '        i = n + "Script",',
            '        s = d.getElementById(i);',
            '    if (u === "' + nainwakGameUrl + '") {',
            '        if (s) {',
            '            w[n].app.destroy();',
            '            w[n] = null;',
            '            b.removeChild(s);',
            '        } else {',
            '            s = d.createElement("script");',
            '            s.id = i;',
            '            s.type = "text/javascript";',
            '            s.src = "' + scriptUrl + '";',
            '            s.async = false;',
            '            s.setAttribute("data-channel", "' + channel + '");',
            '            b.appendChild(s);',
            '        }',
            '    } else {',
            '        alert("Ne fonctionne que sur la page jeu de Nainwak");',
            '    }',
            '}())'
        ];
        return lines.join('\n').replace(/\s+/g, ' ');
    }

    function initializeButtons(buttons) {
        var _buttons = buttons || document.querySelectorAll('.nainwaklet-button');
        Array.prototype.forEach.call(_buttons, function (button) {
            var channel = button.getAttribute('data-channel'),
                href = getInjectionUrl(channel);
            button.setAttribute("href", href);
        });
    }

    // module public API
    var api = {
        pages: pages,
        createUser: createUser,
        createApplication: createApplication,
        initializeButtons: initializeButtons
    };

    // augment the API if we are on the Nainwak game page
    augmentApiOnNainwakGame(api);

    return Object.freeze(api);
}());
