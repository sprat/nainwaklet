var Page = require('./page'),
    detect = require('./detect'),
    perso = require('./perso'),
    invent = require('./invent'),
    even = require('./even'),
    find = require('array-find');

function Pages(pages) {
    function byUrl(url) {
        return find(pages, function (page) {
            return page.url === url;
        });
    }

    function byName(name) {
        return find(pages, function (page) {
            return page.name === name;
        });
    }

    return Object.freeze({
        list: pages,
        byName: byName,
        byUrl: byUrl
    });
}

var pages = Pages([
    detect,
    invent,
    perso,
    even,
    Page('encyclo')
]);

module.exports = pages;
