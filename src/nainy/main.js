/* Module API */
define(['./user', './hub', './bookmarklets'], function (User, Hub, bookmarklets) {
    'use strict';

    return {
        initBookmarklets: bookmarklets.initialize,
        User: User,
        Hub: Hub,
        hub: Hub.createOnNainwak()
    };
});
