/* Nainwak URLs */
define(['app/user', './urls'], function (User, urls) {
    /* Get the Nainwak User info from the menu frame */
    function getUser(window) {
        if (!urls.isInGame(window)) {
            return;
        }

        var frame = window.frames.menu,
            doc = frame.document,
            title = doc.querySelector('.news-titre'),
            name = title.querySelector('td:last-child').innerHTML,
            avatar = title.querySelector('td:first-child img').src;
        return User(name, avatar);
    }

    return {
        getUser: getUser
    };
});