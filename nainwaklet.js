/*global
    window, document, alert, XMLHttpRequest
 */
/*jslint
    this: true
 */

(function () {
    "use strict";

    function log(msg) {
        if (window.console) {
            window.console.log(msg);
        }
    }

    function extend(target, source) {
        var names = Object.keys(source);
        names.forEach(function (name) {
            target[name] = source[name];
        });
    }

    function defineClass(members) {
        // create a constructor function
        function constructor() {
            if (this.initialize) {
                this.initialize.apply(this, arguments);
            }
        }

        // add the members to the prototype
        extend(constructor.prototype, members);

        // return the constructor
        return constructor;
    }

    function startsWith(str, substr) {
        return str.slice(0, substr.length) === substr;
    }

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

    function getIDS() {
        return parseQueryParams(window.location).IDS;
    }

    /*
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

    /* Spy class */
    var Spy = defineClass({
        //infoFrame = window.info.frameElement,
        //this.infoFrameLoaded = infoFrameLoaded;
        // replace the existing content by the hub UI
        //infoFrame.addEventListener('load', infoFrameLoaded, false);
        //infoFrame.removeEventListener('load', storage.infoFrameLoaded, false);
        createUI: function () {
            var button = document.createElement("button"),
                that = this;
            button.setAttribute("class", "spy");
            button.setAttribute("type", "button");
            button.innerHTML = "Lancer MAJ";
            button.onclick = function () {
                var IDS = getIDS();
                if (IDS) {
                    that.sendUpdate(IDS);
                } else {
                    alert("Erreur : ID de session non trouvé, vous devez vous connecter d'abord");
                }
            };
            return button;
        },
        /*
        infoFrameLoaded_: function () {
            var infoDoc = window.info.document,
                url = infoDoc.location,
                html = infoDoc.documentElement.innerHTML;
            log("info frame loaded: " + url);
        },
        */
        gameUrl: function (name, IDS, suffix) {
            //http://www.nainwak.com/accueil/resume.php?IDS=b363601260a8be5d86d1034efba99568&errmsg=
            return 'http://www.nainwak.com/jeu/' + name + '.php?IDS=' + IDS + (suffix || "");
        },
        sendUpdate: function (IDS) {
            var pagesUrls = {
                //menu: this.gameUrl('menu', IDS),  // Menu principal
                pager: this.gameUrl('pager', IDS),  // Pager : PV/PA, compteur des messages
                //pub: this.gameUrl('pub', IDS),  // Publicités
                //map: this.gameUrl('map', IDS),  // Carte de la détection
                detect: this.gameUrl('detect', IDS),  // Détection
                //deplac: this.gameUrl('deplac', IDS),  // Action
                invent: this.gameUrl('invent', IDS),  // Inventaire
                perso: this.gameUrl('perso', IDS),  // Fiche de perso
                even: this.gameUrl('even', IDS, "&duree=240&type=ALL"),  // événements : tous types d'evts sur 10 jours
                //chat: this.gameUrl('chat', IDS),  // Messagerie
                //guilde: this.gameUrl('guilde', IDS),  // Guilde
                encyclo: this.gameUrl('encyclo', IDS)  // Encyclopédie
            };
            Object.keys(pagesUrls).forEach(function (name) {
                var url = pagesUrls[name];
                log(name + ": " + url);
            });
            //asyncGet(pagesUrls.detect, log, log);
        }
    });

    /* Hub class */
    var Hub = defineClass({
        initialize: function (url) {
            this.url = url;
        },
        createUI: function () {
            var iframe = document.createElement("iframe");
            iframe.setAttribute("class", "hub");
            iframe.setAttribute("src", this.url);
            return iframe;
        }
    });

    /* Application class */
    var Application = defineClass({
        initialize: function (hubUrl, cssUrl) {
            this.spy = new Spy();
            this.hub = new Hub(hubUrl);
            this.enabled = false;
            this.container = window.pub.document.body;  // container for the UI
            this.cssLink = this.createCssLink(cssUrl);
        },
        enable: function () {
            if (this.enabled) {
                return;
            }

            var doc = this.container.ownerDocument,
                head = doc.getElementsByTagName('head')[0];

            // add the CSS link element to the head
            head.appendChild(this.cssLink);

            var ui = this.createUI();

            // backup the initial content
            this.containerInitialContent = this.container.innerHTML;

            // replace by our UI
            this.container.innerHTML = "";
            this.container.appendChild(ui);

            this.enabled = true;
        },
        disable: function () {
            if (!this.enabled) {
                return;
            }

            // restore the initial content
            this.container.innerHTML = this.containerInitialContent;

            // remove the CSS link element
            this.cssLink.parentNode.removeChild(this.cssLink);

            this.enabled = false;
        },
        createUI: function () {
            var container = document.createElement("div"),
                spyUI = this.spy.createUI(),
                hubUI = this.hub.createUI();

            container.setAttribute("class", "nainwaklet");

            if (spyUI) {
                container.appendChild(spyUI);
            }

            if (hubUI) {
                container.appendChild(hubUI);
            }

            return container;
        },
        createCssLink: function (url) {
            var link = document.createElement('link');
            link.setAttribute('rel', 'stylesheet');
            link.setAttribute('type', 'text/css');
            link.setAttribute('href', url);
            return link;
        }
    });

    function toggleApp() {
        var currentScript = document.scripts[document.scripts.length - 1],
            scriptLocation = parseUrl(currentScript.src),
            scriptUrl = scriptLocation.origin + scriptLocation.pathname,
            scriptParams = parseQueryParams(scriptLocation),
            cssUrl = scriptUrl.replace('.js', '.css'),
            hubUrl = scriptParams.hub,
            app = window.nainwakletApp;

        if (!app) {  // app not initialized => create & enable
            app = new Application(hubUrl, cssUrl);
            app.enable();
            window.nainwakletApp = app;
        } else {  // app already initialized => disable & delete
            app.disable();
            delete window.nainwakletApp;
        }
    }

    if (startsWith(window.location.href, "http://www.nainwak.com/jeu/index.php")) {
        toggleApp();
    } else {
        alert("Erreur : ce bouton fonctionne uniquement sur la page jeu de Nainwak");
    }
}());