/* HTML utilities */
define(function () {
    function parseDocument(html) {
        /*
        var parser = new DOMParser();
        return parser.parseFromString(html, 'text/html');
        */
        var doc = document.implementation.createHTMLDocument('');
        doc.open();
        doc.write(html);
        doc.close();
        return doc;
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