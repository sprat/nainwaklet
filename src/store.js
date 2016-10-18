function Store(key) {
    var fullKey = 'Nany/' + key;
    var data = JSON.parse(localStorage.getItem(fullKey)) || {};

    data.save = function save() {
        localStorage.setItem(fullKey, JSON.stringify(data));
    };

    return data;
}

module.exports = Store;
