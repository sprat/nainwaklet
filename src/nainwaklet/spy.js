/* Spy factory */
define(['./nainwak', 'utils/log'], function (nainwak, log) {
    function Spy(conf) {  /*user, channel*/
        //IDS = url.parseQueryParams(frame.location).IDS,
        var frame = conf.infoFrame,
            infoLoaded = function () {
                var contentWindow = frame.contentWindow,
                    doc = contentWindow.document,
                    location = contentWindow.location,
                    url = location.origin + location.pathname,
                    page = nainwak.pages.byUrl(url),
                    result;

                if (page) {
                    // TODO: do something useful with the result
                    log('Analyzing ' + page.name);
                    result = page.analyze(doc);
                    log(result);
                }
            },
            isEnabled = false,
            enable = function (value) {
                var oldEnabled = isEnabled;

                // update the status (and convert to boolean, just in case)
                isEnabled = !!value;

                if (oldEnabled === isEnabled) {  // nothing to do
                    return;
                }

                // register or unregister the load event handler
                if (isEnabled) {
                    frame.addEventListener('load', infoLoaded, false);
                } else {
                    frame.removeEventListener('load', infoLoaded, false);
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

    return Spy;
});
