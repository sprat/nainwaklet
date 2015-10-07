/* Dashboard class */
define(['./settings', 'utils/css', 'utils/html'], function (settings, css, html) {
    var cssUrls = [
        'http://www.nainwak.com/css/cadre2.css',
        settings.getCssUrl('dashboard.css')
    ];

    function Dashboard(conf) {
        var container = conf.container,
            //user = conf.user,
            containerContent = null,  // initial content of the container
            ui = (function() {
                var h = html.renderer(document),
                    title = h.div('Hub ' + conf.channel, {
                        className: 'VNT title'
                    }),
                    content = h.div('Chargement en cours...', {
                        className: 'TV content'
                    });

                return h.div([title, content], {
                    className: 'nainy-dashboard'
                });
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
                    var doc = container.ownerDocument;

                    // insert the CSS files
                    // Note: we never remove them!
                    cssUrls.forEach(function(url) {
                        css.insertLink(url, doc);
                    });

                    // backup the initial content
                    containerContent = container.innerHTML;

                    // replace by our UI
                    container.innerHTML = '';
                    container.appendChild(ui);
                } else {
                    // restore the initial content
                    container.innerHTML = containerContent;
                    containerContent = null;
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