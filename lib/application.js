var Spy = require('./spy'),
    Renderer = require('./renderer'),
    User = require('./user'),
    Channel = require('./channel'),
    Ring = require('./ring'),
    pages = require('./pages'),
    log = require('./log');

function getElement(target) {
    if (target === undefined || target === null) {
        return;
    }

    if (target.nodeType !== undefined) {
        // it's already a node
        return target;
    }

    // otherwise, we assume it's a selector
    return window.document.querySelector(target);
}

/* Application class */
function Application(config) {
    config = config || {};

    var infoFrame = window.frames.info,
        channelName = config.channel || 'default',
        user = config.user || User(),
        container = getElement(config.container || window.document.body),
        containerContent,  // backup of the initial content of the container
        channel,
        spy,
        ring;

    function init() {
        // create the (communication) channel
        channel = Channel(channelName);
        channel.connect();

        // create the ring updater
        if (config.ringUpdateUrl && user) {
            ring = Ring(config.ringUpdateUrl, user);
        }

        // create the spy if the info frame is available
        if (infoFrame) {
            spy = Spy(infoFrame);
            spy.on('change', onInfoChange);
        }

        // backup the initial content and install our UI
        containerContent = container.innerHTML;
        var h = Renderer(container.ownerDocument);
        container.innerHTML = '';
        container.appendChild(renderUI(h));
    }

    function destroy() {
        // disconnect the channel
        channel.disconnect();

        // restore the initial content
        container.innerHTML = containerContent;

        // destroy the spy
        if (spy) {
            spy.destroy();
        }
    }

    // called when the info frame change
    function onInfoChange(doc) {
        var pageUrl = doc.location.pathname,
            page = pages.byUrl(pageUrl),
            date = new Date(),
            analysis;

        log('Navigation to ' + pageUrl);

        if (page && page.analyze) {
            analysis = page.analyze(doc, date);
            log(analysis);
        }

        if (ring) {
            ring.sendUpdate(doc, date, analysis);
        }
    }

    function renderUI(h) {
        return h('div.nany', [
            h('div.VNT.title', channel.name),
            renderContent(h)
        ]);
    }

    function updateUI(h) {
        var oldUI = h.find('div.nany'),
            parent = oldUI.parentNode,
            newUI = renderUI(h);
        parent.replaceChild(newUI, oldUI);
    }

    function renderContent(h) {
        var content = [];

        // replace by components' views
        if (!user.password) {
            content.push(renderPasswordField(h));
        } else {
            content.push(h.text('MAJ automatique activée'));
            content.push(renderDeconnectionButton(h));
        }

        return h('div.TV.content', content);
    }

    function renderDeconnectionButton(h) {
        return h('button.disconnect', 'Déconnexion', {
            onclick: function (/*event*/) {
                user.removePassword();
                updateUI(h);
            }
        });
    }

    function renderPasswordField(h) {
        return h('label.password-field', [
            'Mot de passe du Ring',
            h('input', [], {
                type: 'password',
                onchange: function (event) {
                    var password = event.target.value;
                    user.updatePassword(password);
                    updateUI(h);
                }
            })
        ]);
    }

    init();

    return Object.freeze({
        destroy: destroy
    });
}

module.exports = Application;
