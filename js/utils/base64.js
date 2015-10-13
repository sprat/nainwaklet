define(function () {
    // TODO: add tests

    function encode(value) {
        return btoa(value);
    }

    function encodeUrl(value) {
        return encode(value).replace('+', '-').replace('/', '_');
    }

    function decode(value) {
        return atob(value);
    }

    function decodeUrl(value) {
        return decode(value.replace('-', '+').replace('_', '/'));
    }

    return {
        encode: encode,
        encodeUrl: encodeUrl,
        decode: decode,
        decodeUrl: decodeUrl
    };
});