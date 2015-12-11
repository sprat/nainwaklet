define(function () {
    'use strict';

    var textarea = document.createElement('textarea');

    function encode(string) {
        var result;
        textarea.textContent = string;
        result = textarea.innerHTML;
        textarea.textContent = '';
        return result;
    }

    function decode(string) {
        var result;
        textarea.innerHTML = string;
        result = textarea.textContent;
        textarea.textContent = '';
        return result;
    }

    return {
        encode: encode,
        decode: decode
    };
});