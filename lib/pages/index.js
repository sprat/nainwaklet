var Page = require('./page'),
    detect = require('./detect'),
    perso = require('./perso'),
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
    Page('invent'),
    perso,
    Page('encyclo'),
    Page('even', {
        duree: 240,
        type: 'ALL'
    })
]);

module.exports = pages;
