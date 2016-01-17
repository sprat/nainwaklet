function stringify(v) {
    switch (typeof v) {
    case 'string':
        return v;

    case 'boolean':
        return v ? 'true' : 'false';

    case 'number':
        return isFinite(v) ? v : '';

    default:
        return '';
    }
}

function encode(obj, sep, eq) {
    sep = sep || '&';
    eq = eq || '=';

    return Object.keys(obj).map(function (k) {
        var v = obj[k],
            ks = encodeURIComponent(stringify(k)) + '=',
            vs = encodeURIComponent(stringify(v));  // TODO: support arrays
        return ks + vs;
    }).join('&');
}


module.exports = {
    encode: encode
};
