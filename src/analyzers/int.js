function int(v) {
    var result = parseInt(v, 10);
    return (result == v) ? result : undefined;
}

module.exports = int;
