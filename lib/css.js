define(function () {
    function link(url) {
        var linkEl = document.createElement('link');
        linkEl.setAttribute('rel', 'stylesheet');
        linkEl.setAttribute('type', 'text/css');
        linkEl.setAttribute('href', url);
        return linkEl;
    }

    function insertLink(url, document) {
        var linkEl = link(url);
        document.getElementsByTagName("head")[0].appendChild(linkEl);
    }

    return {
        link: link,
        insertLink: insertLink
    }
});
