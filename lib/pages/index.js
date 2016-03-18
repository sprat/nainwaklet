var detect = require('./detect'),
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

    function byType(type) {
        return find(pages, function (page) {
            return page.type === type;
        });
    }

    return Object.freeze({
        list: pages,
        byType: byType,
        byUrl: byUrl
    });
}

var pages = Pages([
    detect,
    invent,
    perso,
    even
]);

module.exports = pages;
