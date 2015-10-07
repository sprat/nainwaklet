/* HTML utilities */
define(function () {
    function parseDocument(html) {
        // The HTML parsing is not supported on all the browsers, maybe we
        // should use a polyfill?
        var parser = new DOMParser();
        return parser.parseFromString(html, 'text/html');
    }

    function load(url, processResponse) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);  // async
        xhr.responseType = 'document';
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {  // response received and loaded
                processResponse({
                    status: xhr.status,
                    document: xhr.response
                });
            }
        };
        xhr.send(null);
    }

    return {
        parseDocument: parseDocument,
        load: load
    };
});