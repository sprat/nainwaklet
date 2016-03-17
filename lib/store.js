function Store(key) {
    var data = JSON.parse(localStorage.getItem(key)) || {};

    data.save = function save() {
        localStorage.setItem(key, JSON.stringify(data));
    };

    return data;
}

module.exports = Store('nany');
