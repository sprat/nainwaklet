/* CSS utilities */
define(['utils/array'], function (array) {
    function findHead(document) {
        var doc = document || window.document;
        return doc.getElementsByTagName('head')[0];
    }

    function findLink(url, document) {
        var links = findHead(document).getElementsByTagName('link');
        return array.find(links, function(link) {
            return link.href === url;
        });
    }

    function createLink(url, document) {
        var doc = document || window.document,
            link = doc.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('type', 'text/css');
        link.setAttribute('href', url);
        return link;
    }

    function insertLink(url, document) {
        // check if there's already a link with this url in the document
        var link = findLink(url, document);
        if (link) {
            return;
        }

        // otherwise, create and return it
        link = createLink(url, document);
        findHead(document).appendChild(link);
        return link;
    }

    return {
        createLink: createLink,
        insertLink: insertLink
    };
});
