var Spy = require('./spy'),
    Renderer = require('./renderer'),
    User = require('./user'),
    Channel = require('./channel'),
    Ring = require('./ring'),
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
        containerContent = null,  // initial content of the container
        isEnabled = false,
        channel,
        spy,
        ring;

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

    // start enabled
    enable(true);

    function destroy() {
        enable(false);

        if (spy) {
            spy.destroy();
        }

        channel.disconnect();
    }

    // called when the info frame change
    function onInfoChange(doc) {
        var url = doc.location.href;

        log('Navigation to ' + url);

        /*
        pages = require('./pages'),
        var page = pages.byUrl(url)
        if (page && page.analyze) {
            log('Analyzing ' + page.name);
            log(page.analyze(doc));
        }
        */

        if (ring) {
            ring.sendUpdate(doc);
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

    function enable(value) {
        var oldEnabled = isEnabled,
            h;

        // update the status (and convert to boolean, just in case)
        isEnabled = !!value;

        if (isEnabled === oldEnabled) {  // nothing to do
            return;
        }

        if (isEnabled) {
            // backup the initial content
            containerContent = container.innerHTML;

            // replace by our UI
            h = Renderer(container.ownerDocument);
            container.innerHTML = '';
            container.appendChild(renderUI(h));
        } else {
            // restore the initial content
            container.innerHTML = containerContent;
            containerContent = null;
        }
    }

    return Object.freeze({
        get enabled() {
            return isEnabled;
        },
        set enabled(value) {
            enable(value);
        },
        destroy: destroy
    });
}

module.exports = Application;
