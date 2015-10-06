/* User factory */
define(['./settings'], function (settings) {
    var defaultAvatarUrl = settings.getImageUrl('avatar.png');

    function generateRandomGuestName() {
        var id = Math.round(Math.random() * 1000);
        return 'guest' + id;
    }

    function User(name, avatar) {
        return Object.freeze({
            name: name || generateRandomGuestName(),
            avatar: avatar || defaultAvatarUrl
        });
    }

    return User;
});