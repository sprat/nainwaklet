/* CSS utilities */
var array = require('./array'),
    urlUtils = require('./url');


function findHead(document) {
    var doc = document || window.document;
    return doc.getElementsByTagName('head')[0];
}

function findLink(url, document) {
    var href = urlUtils.normalize(url, document),
        links = findHead(document).getElementsByTagName('link');
    return array.find(links, function(link) {
        return link.href === href;
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


module.exports = {
    createLink: createLink,
    insertLink: insertLink
};
