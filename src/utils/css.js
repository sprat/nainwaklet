/* CSS utilities */
define(function () {
    function createLink(url) {
        var link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('type', 'text/css');
        link.setAttribute('href', url);
        return link;
    }

    function insertLink(url, document) {
        var link = createLink(url);
        document.getElementsByTagName('head')[0].appendChild(link);
        return link;
    }

    return {
        createLink: createLink,
        insertLink: insertLink
    };
});
