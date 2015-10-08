define(['./application', './user', './nainwak', './settings', 'utils/css'], function (Application, User, nainwak, settings, css) {
    // create an Hub object running on the Nainwak game page
    function runOnNainwak(module) {
        if (!nainwak.isInGame(window)) {
            return;
        }

        var pubDoc = window.frames.pub.document,
            infoFrame = window.frames.info.frameElement,
            nain = nainwak.getNain(window);

        // insert the CSS file if needed (we never remove it!)
        css.insertLink(settings.cssUrl, pubDoc);

        // create the Hub and assign it to the external api
        module.app = Application({
            user: User(nain.nom, nain.image),
            channel: settings.channel,
            container: pubDoc.body,
            infoFrame: infoFrame
        });
    }

    return runOnNainwak;
});