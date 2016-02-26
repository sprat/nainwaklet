var Renderer = require('./renderer');


/* Dashboard class */
function Dashboard(conf) {
    var container = conf.container,
        channel = conf.channel,
        user = conf.user,
        containerContent = null,  // initial content of the container
        isEnabled = false;

    function render() {
        var h = Renderer(document),
            title = h('div.VNT.title', channel.name),
            content = h('div.TV.content', [
                h('label', 'Mot de passe'),
                h('input', [], {
                    type: 'password',
                    onchange: function (event) {
                        var password = event.target.value;
                        user.updatePassword(password);
                        content.innerHTML = 'MAJ auto active';
                    }
                })
            ]);

        return h('div.nany', [title, content]);
    }

    function enable(value) {
        var oldEnabled = isEnabled;

        // update the status (and convert to boolean, just in case)
        isEnabled = !!value;

        if (isEnabled === oldEnabled) {  // nothing to do
            return;
        }

        if (isEnabled) {
            // backup the initial content
            containerContent = container.innerHTML;

            // replace by our UI
            container.innerHTML = '';
            container.appendChild(render());
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
