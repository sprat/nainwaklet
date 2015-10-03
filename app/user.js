/* User factory */
define(['require'], function (require) {
    var defaultAvatarUrl = require.toUrl('images/avatar.png');

    function generateRandomGuestName() {
        var id = Math.round(Math.random() * 1000);
        return 'guest' + id;
    }

    function createUser(name, avatar) {
        return Object.freeze({
            name: name || generateRandomGuestName(),
            avatar: avatar || defaultAvatarUrl
        });
    }

    return createUser;
});