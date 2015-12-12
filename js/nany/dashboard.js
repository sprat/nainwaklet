define(['utils/renderer'], function (renderer) {
    'use strict';

    /* Dashboard class */
    function Dashboard(container, channel) {
        var containerContent = null,  // initial content of the container
            ui = (function() {
                var render = renderer(document),
                    title = render('div', channel.name, {
                        className: 'VNT title'
                    }),
                    content = render('div', 'Chargement en cours...', {
                        className: 'TV content'
                    });

                return render('div', [title, content], {
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