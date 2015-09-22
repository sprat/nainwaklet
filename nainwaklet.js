/*global
    window, document, alert, XMLHttpRequest
 */
/*jslint
    devel: true
 */

/* Nainwaklet module */
var Nainwaklet = (function () {
    'use strict';

    var nainwakOrigin = 'http://www.nainwak.com',
        nainwakImagesBaseUrl = nainwakOrigin + '/images/',
        nainwakGameUrl = nainwakOrigin + '/jeu/index.php',
        script = document.scripts[document.scripts.length - 1],
        scriptUrl = script.src,
        scriptBaseUrl = scriptUrl.substring(0, scriptUrl.lastIndexOf('/') + 1),
        scriptChannel = script.getAttribute('data-channel'),
        log = (window.console)
            ? Function.prototype.bind.call(window.console.log, window.console)
            : function () {
                return;
            };

    function assert(condition, message) {
        if (!condition) {
            throw new Error(message || 'Assertion failed');
        }
    }

    function extend(target, source) {
        Object.keys(source).forEach(function (key) {
            if (target[key] === undefined) {
                target[key] = source[key];
            }
        });
        return target;
    }

    function parseHttpHeaders(string) {
        var headers = {},
            pairs = string.trim().split('\r\n');

        pairs.forEach(function (pair) {
            var split = pair.trim().split(':'),
                key = split.shift().trim(),
                value = split.join(':').trim();
            headers[key] = value;
        });

        return headers;
    }

    function ajaxRequest(url, options, processResponse) {
        if (typeof options === 'function' && processResponse === undefined) {
            processResponse = options;
            options = {};
        }
        options = options || {};

        var xhr = new XMLHttpRequest(),
            method = options.method || 'GET',
            headers = options.headers || {};

        xhr.open(method, url, true, options.username, options.password);  // async

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {  // response received and loaded
                processResponse({
                    status: xhr.status,
                    body: xhr.response || xhr.responseXML || xhr.responseText,
                    headers: parseHttpHeaders(xhr.getAllResponseHeaders())
                });
            }
        };

        // set the response type if provided
        if (options.responseType) {
            xhr.responseType = options.responseType;
        }

        // override mimetype if provided
        if (options.mimetype && xhr.overrideMimeType) {
            xhr.overrideMimeType(options.mimeType);
        }

        // add the headers
        Object.keys(headers).forEach(function (key) {
            xhr.setRequestHeader(key, headers[key]);
        });

        xhr.send(options.data);
    }

    function buildQueryParams(params) {
        var pairs = [];
        Object.keys(params).forEach(function (key) {
            var value = params[key],
                encodedKey = encodeURIComponent(key),
                encodedValue = encodeURIComponent(value);
            pairs.push(encodedKey + '=' + encodedValue);
        });
        return pairs.join('&');
    }

    /*
    function parseUrl(url) {
        var a = document.createElement('a');
        a.href = url;
        return a;
    }
    */

    // TODO: refactor to findAllMatches so that we can map the arrays of matches
    function forEachMatch(regex, string, processMatch) {
        var match;

        assert(regex.global, 'The RegExp should have the global flag set');

        while (true) {
            match = regex.exec(string);
            if (match === null) {
                break;
            }
            processMatch(match);
        }
    }

    // Array.prototype.find is available in ES6, but not before
    function findInArray(array, predicate) {
        var length = array.length,
            i = 0,
            element;

        // Note: a for loop would be better here but I can't/don't want to
        // disable the jslint warning in the remaining source
        while (i < length) {
            element = array[i];
            if (predicate(element)) {
                return element;
            }
            i += 1;
        }
    }

    function decodeHtmlEntities(str) {
        // TODO: not really efficient, a regex-based implementation would be better
        var txt = document.createElement("textarea");
        txt.innerHTML = str;
        return txt.value;
    }

    function parseJavascriptArray(string) {
        // parses a string containing a representation of a Javascript array
        // and returns it
        var cleaned = string.replace(/([\[,]\s*)'(.*)'(\s*[,\]])/g, function (ignore, before, inside, after) {
                var escaped = inside.replace(/"/g, '\\"');  // escape double-quotes inside
                return before + '"' + escaped + '"' + after;  // wrap in double-quotes
            }),
            values = JSON.parse(cleaned);

        return values.map(function (value) {
            return decodeHtmlEntities(value);
        });
    }

    function arrayToObject(keys, values) {
        var obj = {};

        assert(keys.length === values.length, 'keys and values should have the same length');

        keys.forEach(function (key, i) {
            obj[key] = values[i];
        });

        return obj;
    }

    function generateRandomGuestName() {
        var id = Math.round(Math.random() * 1000);
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
    function createPage(name, analyze, loadParams) {
        var url = nainwakOrigin + '/jeu/' + name + '.php';

        function getUrl(IDS) {
            var params = {
                IDS: IDS
            };
            if (loadParams) {
                extend(params, loadParams);
            }
            return url + '?' + buildQueryParams(params);
        }

        function load(IDS, processResult) {
            var fullUrl = getUrl(IDS);
            ajaxRequest(fullUrl, function (response) {
                var result = null;
                if (response.status === 200) {
                    result = analyze(response.body);
                }
                processResult(result);
            });
        }

        return Object.freeze({
            name: name,
            url: url,  // base URL without query parameters
            analyze: analyze,
            load: load
        });
    }

    /* detect page */
    var detect = (function () {
        function int(value) {
            return parseInt(value, 10);
        }

        function findLocalisation(html) {
            // example:
            // <span class="c1">Position (13,5) sur "Ronain Graou" |b95eb2f716c500db6|</span>
            var regex = /<span\sclass="c1">Position\s\((\d+),(\d+)\)\ssur\s"([^"]*)"/i,
                match = regex.exec(html);

            if (match) {
                return {
                    position: [int(match[1]), int(match[2])],
                    monde: match[3]
                };
            }
        }

        function processArrays(html, regex, keys, createObject) {
            var results = [];

            forEachMatch(regex, html, function (match) {
                var values = parseJavascriptArray(match[1]),
                    spec = arrayToObject(keys, values),
                    object = createObject(spec);

                results.push(object);
            });

            return results;
        }

        function findNains(html) {
            var regex = /tabavat\[\d+\]\s=\s(\[.*\]);/ig,
                keys = 'id,photo,nom,tag,barbe,classe,cote,distance,x,y,description,attaquer,gifler,estCible';

            return processArrays(html, regex, keys.split(','), function (spec) {
                // TODO: not implemented
//              switch(classe) {
//                  case 0 : "naindeci"
//                  case 1 : "gentil"
//                  case 2 : "mechant"
//                  case 3 : "rampant"
//                  case 7 : "mutant"
                log(spec);
                return {
                    id: int(spec.id),
                    nom: spec.nom,
                    image: nainwakImagesBaseUrl + spec.photo,
                    description: spec.description,
                    position: [int(spec.x), int(spec.y)]
                };
            });
        }

        function findObjets(html) {
            var regex = /tabobjet\[\d+\]\s=\s(\[.*\]);/ig,
                keys = 'id,photo,nom,distance,x,y,categorie,poussiere';

            return processArrays(html, regex, keys.split(','), function (spec) {
                return {
                    id: int(spec.id),
                    nom: spec.nom,
                    image: nainwakImagesBaseUrl + spec.photo,
                    categorie: spec.categorie,
                    position: [int(spec.x), int(spec.y)],
                    poussiere: int(spec.poussiere)  // expressed in seconds
                };
            });
        }

        function analyze(html) {
            log('Analyzing detect...');
            var localisation = findLocalisation(html),
                nains = findNains(html),
                objets = findObjets(html);

            return {
                monde: localisation.monde,
                position: localisation.position,
                nains: nains,
                objets: objets
            };
        }

        return createPage('detect', analyze, {});
    }());

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

    /* pages */
    var pages = (function () {
        var elements = [detect],
            getByUrl = function (url) {
                return findInArray(elements, function (page) {
                    return page.url === url;
                });
            },
            self = {
                getByUrl: getByUrl
            };

        // add the pages to the object
        elements.forEach(function (page) {
            self[page.name] = page;
        });

        return Object.freeze(self);
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
                    page = pages.getByUrl(url),
                    result;

                if (page) {
                    result = page.analyze(html);
                    log(result);
                }
            },
            isEnabled = false,
            enable = function (value) {
                var oldEnabled = isEnabled;

                // update the status (and convert to boolean, just in case)
                isEnabled = !!value;

                if (oldEnabled === isEnabled) {  // nothing to do
                    return;
                }

                // register or unregister the load event handler
                if (isEnabled) {
                    frame.addEventListener('load', infoLoaded, false);
                } else {
                    frame.removeEventListener('load', infoLoaded, false);
                }
            };

        // start enabled
        enable(true);

        return Object.freeze({
            get enabled() {
                return isEnabled;
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
            isEnabled = false,
            enable = function (value) {
                var oldEnabled = isEnabled;

                // update the status (and convert to boolean, just in case)
                isEnabled = !!value;

                if (isEnabled === oldEnabled) {  // nothing to do
                    return;
                }

                if (isEnabled) {
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
                return isEnabled;
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
        createUser: createUser,
        createApplication: createApplication,
        initializeButtons: initializeButtons,
        testing: Object.freeze({  // testing API
            pages: pages,
            ajaxRequest: ajaxRequest
        })
    };

    // augment the API if we are on the Nainwak game page
    augmentApiOnNainwakGame(api);

    return Object.freeze(api);
}());
