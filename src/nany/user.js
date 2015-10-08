/* User factory */
define(function () {
    function generateRandomGuestName() {
        var id = Math.round(Math.random() * 1000);
        return 'guest' + id;
    }

    function User(name, image) {
        return Object.freeze({
            name: name || generateRandomGuestName(),
            image: image
        });
    }

    return User;
});