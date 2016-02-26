var Page = require('./page'),
    detect = require('./detect'),
    find = require('array-find');

function Pages(pages) {
    function byUrl(url) {
        url = url.split('?', 1)[0];
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

var pages = [
    detect,
    Page('invent'),
    Page('perso'),
    Page('encyclo'),
    Page('even', {
        duree: 240,
        type: 'ALL'
    })
];

module.exports = Pages(pages);
