/* URL utilities */
define(function () {
    function parse(url) {
        var a = document.createElement('a');
        a.href = url;
        return a;
    }

    function buildQueryParams(params) {
        var pairs = [];
        Object.keys(params).forEach(function (key) {
            var value = params[key],
                encodedKey = encodeURIComponent(key),
                encodedValue = encodeURIComponent(value);
            pairs.push(encodedKey + '=' + encodedValue);
        });
        return pairs.join('&');
    }

    return {
        parse: parse,
        buildQueryParams: buildQueryParams
    };
});