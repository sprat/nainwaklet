var script = require('./script'),
    Spy = require('./spy'),
    Renderer = require('./renderer'),
    User = require('./user'),
    //Channel = require('./channel'),
    Ring = require('./ring'),
    pages = require('./pages'),
    log = require('./log');

/* Get the Nainwak User info from the menu frame */
function getNain(frames) {
    var frame = frames.menu,
        doc = frame.document,
        title = doc.querySelector('.news-titre'),
        name = title.querySelector('td:last-child').innerHTML,
        image = title.querySelector('td:first-child img').src;

    return {
        nom: name,
        image: image
    };
}

/* Application class */
function Application() {
    var frames = window.frames,
        infoFrame = frames.info,
        container = frames.pub.document.body,
        nain = getNain(frames),
        user = User(nain.nom, nain.image),
        channelName = script.getParameter('channel') || 'default',
        ringUpdateUrl = script.getParameter('ring-update-url'),
        containerContent,  // backup of the initial content of the container
        //channel,
        spy,
        ring;

    function init() {
        /*
        // create the (communication) channel
        channel = Channel(channelName);
        channel.connect();
        */

        // create the ring updater
        if (ringUpdateUrl && user) {
            ring = Ring(ringUpdateUrl, user);
        }

        // create the spy if the info frame is available
        if (infoFrame) {
            spy = Spy(infoFrame);
            spy.on('change', onInfoChange);
        }

        // backup the initial content and install our UI
        // Note: we never remove the CSS, maybe that's something we should do...
        script.loadCSS(container.ownerDocument);
        containerContent = container.innerHTML;
        var h = Renderer(container.ownerDocument);
        container.innerHTML = '';
        container.appendChild(renderUI(h));
    }

    function destroy() {
        /*
        // disconnect the channel
        channel.disconnect();
        */

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
        return h('div.nany.nany-dashboard', [
            h('div.VNT.title', channelName),
            renderContent(h)
        ]);
    }

    function updateUI(h) {
        var oldUI = h.find('div.nany.nany-dashboard'),
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
