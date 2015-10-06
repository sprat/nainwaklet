/* CSS utilities */
define(['utils/array'], function (array) {
    function head(document) {
        return document.getElementsByTagName('head')[0];
    }

    function createLink(url) {
        var link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('type', 'text/css');
        link.setAttribute('href', url);
        return link;
    }

    function findLink(url, document) {
        var links = head(document).getElementsByTagName('link');
        return array.find(links, function(link) {
            return link.href === url;
        });
    }

    function insertLink(url, document) {
        // check if there's already a link with this url in the document
        var link = findLink(url, document);
        if (link) {
            return;
        }

        // otherwise, create and return it
        link = createLink(url);
        head(document).appendChild(link);
        return link;
    }

    return {
        createLink: createLink,
        insertLink: insertLink
    };
});
