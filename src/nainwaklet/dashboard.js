/* Dashboard class */
define(['./settings', 'utils/css'], function (settings, css) {
    css.insertLink('http://www.nainwak.com/css/cadre2.css', document);
    css.insertLink(settings.getCssUrl('dashboard.css'), document);

    function Dashboard(conf) {
        var container = conf.container,
            containerContent = null,  // initial content of the container
            ui = (function() {
                var dashboard = document.createElement('div'),
                    title = document.createElement('div'),
                    content = document.createElement('div');

                dashboard.className = 'nainwaklet-dashboard';
                title.className = 'VNT title';
                title.innerText = 'Hub ' + conf.channel + ' [' + conf.user.name + ']';
                content.className = 'TV content';
                content.innerText = 'Chargement en cours...';
                dashboard.appendChild(title);
                dashboard.appendChild(content);
                return dashboard;
            }()),
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

    return Dashboard;
});