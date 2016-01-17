/* Base64 conversion functions */

function rpad(string, length, pad) {
    for (; length > 0; length -= 1) {
        string += pad;
    }
    return string;
}

function encode(value) {
    return btoa(value);
}

function encodeUrl(value) {
    return encode(value).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

function decode(value) {
    return atob(value);
}

function decodeUrl(value) {
    // it seems that atob accepts incorrectly padded base64 strings
    var data = value.replace(/-/g, '+').replace(/_/g, '/'),
        missing = data.length % 4;

    if (missing) {
        data = rpad(data, 4 - missing, '=');
    }

    return decode(data);
}


module.exports = {
    encode: encode,
    encodeUrl: encodeUrl,
    decode: decode,
    decodeUrl: decodeUrl
};
