function Store(key) {
    function save() {
        localStorage.setItem(key, JSON.stringify(this));
    }

    var data = JSON.parse(localStorage.getItem(key)) || {};
    data.save = save;
    return data;
}

module.exports = Store('nany');
