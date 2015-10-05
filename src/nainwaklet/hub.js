/* Hub factory */
define(['./config'], function (config) {
    function Hub(container) {  /*, user, channel*/
        var containerContent = null,  // original content of the container
            ui = (function () {  // create the hub UI
                var iframe = document.createElement('iframe');
                iframe.setAttribute('class', 'nainwaklet-hub');
                iframe.setAttribute('src', config.hubUrl());
                iframe.style.width = '100%';
                iframe.style.border = 0;
                return iframe;
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

    return Hub;
});