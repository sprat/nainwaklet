/* Module API */
define(['./user', './application', './bookmarklets', './runOnNainwak'], function (User, Application, bookmarklets, runOnNainwak) {
    'use strict';

    var module = {
        initBookmarklets: bookmarklets.initialize,
        User: User,
        Application: Application
    };

    runOnNainwak(module);

    return module;
});
