var md5 = require('md5'),
    store = require('./store');

function encodePassword(name, password) {
    return md5(name + md5(password));
}

/* User class */
function User(name, image) {
    name = name || 'anonymous';
    var userSettings = store[name] = store[name] || {};

    return Object.freeze({
        name: name,
        image: image,
        get password() {
            return userSettings.password;
        },
        updatePassword: function (password) {
            // if password is empty, we'll consider that the user does not
            // want to use features requiring authentication
            var encodedPassword = password ? encodePassword(name, password) : '';
            userSettings.password = encodedPassword;
            store.save();
        },
        removePassword: function() {
            delete userSettings.password;
            store.save();
        }
    });
}

module.exports = User;
