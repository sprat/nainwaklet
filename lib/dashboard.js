var Renderer = require('./renderer');


/* Dashboard class */
function Dashboard(conf) {
    var container = conf.container,
        channel = conf.channel,
        user = conf.user,
        containerContent = null,  // initial content of the container
        isEnabled = false;

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


module.exports = Dashboard;
