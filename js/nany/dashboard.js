define(['utils/html'], function (html) {
    'use strict';

    /* Dashboard class */
    function Dashboard(conf) {
        var container = conf.container,
            channel = conf.channel,
            //user = conf.user,
            containerContent = null,  // initial content of the container
            ui = (function() {
                var h = html.renderer(document),
                    title = h.div(channel.name, {
                        className: 'VNT title'
                    }),
                    content = h.div('Chargement en cours...', {
                        className: 'TV content'
                    });

                return h.div([title, content], {
                    className: 'nany'
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