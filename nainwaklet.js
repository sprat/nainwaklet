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
        initialize: function () {
            this.IDS = parseQueryParams(window.location).IDS;
            this.infoFrame = window.info.frameElement;
            this.infoLoadedListener = null;
        },

        enable: function () {
            if (this.isEnabled()) {
                return false;
            }

            this.infoLoadedListener = this.infoLoaded.bind(this);
            this.infoFrame.addEventListener('load', this.infoLoadedListener, false);
            return true;
        },

        disable: function () {
            if (!this.isEnabled()) {
                return false;
            }

            this.infoFrame.removeEventListener('load', this.infoLoadedListener, false);
            this.infoLoadedListener = null;
            return true;
        },

        isEnabled: function () {
            return this.infoLoadedListener !== null;
        },

        createUI: function () {
            var button = document.createElement("button"),
                that = this;
            button.setAttribute("class", "spy");
            button.setAttribute("type", "button");
            button.innerHTML = "Lancer MAJ";
            button.onclick = function () {
                that.sendUpdate();
            };
            return button;
        },

        infoLoaded: function () {
            var infoDoc = window.info.document,
                url = infoDoc.location;
            //html = infoDoc.documentElement.innerHTML;
            log("info frame loaded: " + url);
        },

        gameUrl: function (name, suffix) {
            //http://www.nainwak.com/accueil/resume.php?IDS=b363601260a8be5d86d1034efba99568&errmsg=
            return 'http://www.nainwak.com/jeu/' + name + '.php?IDS=' + this.IDS + (suffix || "");
        },

        sendUpdate: function () {
            var pagesUrls = {
                //menu: this.gameUrl('menu'),  // Menu principal
                pager: this.gameUrl('pager'),  // Pager : PV/PA, compteur des messages
                //pub: this.gameUrl('pub'),  // Publicités
                //map: this.gameUrl('map'),  // Carte de la détection
                detect: this.gameUrl('detect'),  // Détection
                //deplac: this.gameUrl('deplac'),  // Action
                invent: this.gameUrl('invent'),  // Inventaire
                perso: this.gameUrl('perso'),  // Fiche de perso
                even: this.gameUrl('even', "&duree=240&type=ALL"),  // événements : tous types d'evts sur 10 jours
                //chat: this.gameUrl('chat'),  // Messagerie
                //guilde: this.gameUrl('guilde'),  // Guilde
                encyclo: this.gameUrl('encyclo')  // Encyclopédie
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
        initialize: function (container, hubUrl, cssUrl) {
            this.container = container;  // container for the UI
            this.spy = new Spy();  // Spy component
            this.hub = new Hub(hubUrl);  // Hub component
            this.ui = this.createUI();  // app UI
            this.css = this.createCSS(cssUrl);  // app CSS
            this.containerInitialContent = null;
        },

        enable: function () {
            /* This method installs the application UI in the container
             * element if the application is not already enabled.
             */
            if (this.isEnabled()) {
                return false;
            }

            var doc = this.container.ownerDocument,
                head = doc.getElementsByTagName('head')[0];

            // add the CSS element to the head
            head.appendChild(this.css);

            // backup the initial content
            this.containerInitialContent = this.container.innerHTML;

            // replace by our UI
            this.container.innerHTML = "";
            this.container.appendChild(this.ui);

            // enable the spy agent
            this.spy.enable();

            return true;
        },

        disable: function () {
            /* This method removes the application UI from the container
             * element and restores its content if the application is enabled.
             */
            if (!this.isEnabled()) {
                return false;
            }

            // disable the spy agent
            this.spy.disable();

            // restore the initial content
            this.container.innerHTML = this.containerInitialContent;
            this.containerInitialContent = null;;

            // remove the CSS element
            this.css.parentNode.removeChild(this.css);

            return true;
        },

        isEnabled: function () {
            return this.containerInitialContent !== null;
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

        createCSS: function (url) {
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
            container = window.pub.document.body,
            app = window.nainwakletApp;

        if (!app) {  // app not initialized => create & enable
            app = new Application(container, hubUrl, cssUrl);
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