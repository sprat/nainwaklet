var md5 = require('md5'),
    passwordStoragePrefix = 'nany:user:password:';


function generateRandomGuestName() {
    var id = Math.round(Math.random() * 1000);
    return 'guest' + id;
}

function encodePassword(name, password) {
    return md5(name + md5(password));
}

/* User class */
function User(name, image) {
    return Object.freeze({
        name: name || generateRandomGuestName(),
        image: image,
        get password() {
            return localStorage.getItem(passwordStoragePrefix + name);
        },
        updatePassword: function (password) {
            // if password is empty, we'll consider that the user does not
            // want to use features requiring authentication
            var encodedPassword = password ? encodePassword(name, password) : '';
            localStorage.setItem(passwordStoragePrefix + name, encodedPassword);
        },
        removePassword: function() {
            localStorage.removeItem(passwordStoragePrefix + name);
        }
    });
}


module.exports = User;
