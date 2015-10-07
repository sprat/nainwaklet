/* User factory */
define(['./nainwak'], function (nainwak) {
    var defaultImageUrl = nainwak.imageUrl('avatar/choix/mechant.gif');

    function generateRandomGuestName() {
        var id = Math.round(Math.random() * 1000);
        return 'guest' + id;
    }

    function User(name, image) {
        return Object.freeze({
            name: name || generateRandomGuestName(),
            image: image || defaultImageUrl
        });
    }

    return User;
});