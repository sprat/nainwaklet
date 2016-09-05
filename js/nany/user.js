var md5 = require('md5'),
    store = require('./store');

function encodePassword(name, password) {
    return md5(name + md5(password));
}

/* User class */
function User(name) {
    var settings = store[name] = store[name] || {};
    settings.save = store.save;

    return {
        get name() {
            return name;
        },
        get password() {
            return settings.password;
        },
        updatePassword: function (password) {
            // if password is empty, we'll consider that the user does not
            // want to use features requiring authentication
            settings.password = password ? encodePassword(name, password) : '';
            settings.save();
        },
        removePassword: function() {
            delete settings.password;
            settings.save();
        }
    };
}

module.exports = User;
