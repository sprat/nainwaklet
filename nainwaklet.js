/*global
    window, document, alert, XMLHttpRequest
 */
(function (exports) {
    "use strict";

    function log(msg) {
        if (window.console) {
            window.console.log(msg);
        }
    }

    function startsWith(str, substr) {
        return str.slice(0, substr.length) === substr;
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

    function gameUrl(name, IDS, suffix) {
        //http://www.nainwak.com/accueil/resume.php?IDS=b363601260a8be5d86d1034efba99568&errmsg=
        return 'http://www.nainwak.com/jeu/' + name + '.php?IDS=' + IDS + (suffix || "");
    }

    function sendUpdate(IDS) {
        var pagesUrls = {
            //menu: gameUrl('menu', IDS),  // Menu principal
            pager: gameUrl('pager', IDS),  // Pager : PV/PA, compteur des messages
            //pub: gameUrl('pub', IDS),  // Publicités
            //map: gameUrl('map', IDS),  // Carte de la détection
            detect: gameUrl('detect', IDS),  // Détection
            //deplac: gameUrl('deplac', IDS),  // Action
            invent: gameUrl('invent', IDS),  // Inventaire
            perso: gameUrl('perso', IDS),  // Fiche de perso
            even: gameUrl('even', IDS, "&duree=240&type=ALL"),  // événements : tous types d'evts sur 10 jours
            //chat: gameUrl('chat', IDS),  // Messagerie
            //guilde: gameUrl('guilde', IDS),  // Guilde
            encyclo: gameUrl('encyclo', IDS)  // Encyclopédie
        };
        Object.keys(pagesUrls).forEach(function (name) {
            var url = pagesUrls[name];
            log(name + ": " + url);
        });
        //asyncGet(pagesUrls.detect, log, log);
    }

    function createUpdateButton() {
        var button = document.createElement("button");
        button.setAttribute("type", "button");
        button.innerHTML = "Lancer MAJ";
        button.style.marginBottom = "10px";
        button.onclick = function () {
            var IDS = getIDS();
            if (IDS) {
                sendUpdate(IDS);
            } else {
                alert("Erreur : ID de session non trouvé, vous devez vous connecter d'abord");
            }
        };
        return button;
    }

    function createHubMenu(hubPath) {
        var iframe = document.createElement("iframe");
        iframe.setAttribute("src", getBaseUrl() + hubPath);
        iframe.style.width = "100%";
        return iframe;
    }

    function createHubUI(hubPath) {
        var ui = document.createElement("div"),
            updateButton = createUpdateButton(),
            hubMenu = createHubMenu(hubPath);
        ui.setAttribute("id", "hubUI");
        ui.style.textAlign = "center";
        ui.appendChild(updateButton);
        ui.appendChild(hubMenu);
        return ui;
    }

    function infoFrameLoaded() {
        var infoDoc = window.info.document,
            url = infoDoc.location,
            html = infoDoc.documentElement.innerHTML;
        log("info frame loaded: " + url);
    }

    function toggleHubUI(hubPath, storage) {
        var infoFrame = window.info.frameElement,
            pubDoc = window.pub.document,
            pubBody = pubDoc.body,
            hubUI = pubDoc.getElementById("hubUI");

        if (!hubUI) {
            // backup the existing content
            storage.pubBodyInnerHTML = pubBody.innerHTML;
            storage.infoFrameLoaded = infoFrameLoaded;

            // replace the existing content by the hub UI
            hubUI = createHubUI(hubPath);
            pubBody.innerHTML = "";
            pubBody.appendChild(hubUI);
            infoFrame.addEventListener('load', infoFrameLoaded, false);
        } else {
            // restore the initial content
            pubBody.innerHTML = storage.pubBodyInnerHTML;
            infoFrame.removeEventListener('load', storage.infoFrameLoaded, false);
        }
    }

    function getBaseUrl() {
        var scriptUrl = document.scripts[document.scripts.length - 1].src;
        return scriptUrl.substring(0, scriptUrl.lastIndexOf('/') + 1);
    }

    function getQueryParams() {
        var query = window.location.search.substr(1),
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
        return getQueryParams().IDS;
    }

    function runOnNainwak(hubPath) {
        if (startsWith(window.location.href, "http://www.nainwak.com/jeu/index.php")) {
            // initialize the plugin storage
            exports.nainwaklet = exports.nainwaklet || {};
            // toggle the UI
            toggleHubUI(hubPath, exports.nainwaklet);
        } else {
            alert("Erreur : ce bouton fonctionne uniquement sur la page jeu de Nainwak");
        }
    }

    runOnNainwak("hub.html");
}(window));