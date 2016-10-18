var Signal = require('mini-signals');

function Storage(name) {
    var changed = new Signal();
    var data = JSON.parse(localStorage.getItem(name)) || {};

    function get(key) {
        return data[key];
    }

    function set(key, value) {
        if (value === undefined) {
            delete data[key];
        } else {
            data[key] = value;
        }

        localStorage.setItem(name, JSON.stringify(data));
        changed.dispatch(key, value);
    }

    return {
        // methods
        get: get,
        set: set,
        // signals
        changed: changed
    };
}

module.exports = Storage;
