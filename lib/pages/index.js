var Page = require('./page'),
    detect = require('./detect'),
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

var invent = Page('invent'),
    perso = Page('perso'),
    encyclo = Page('encyclo'),
    even = Page('even', {
        fetchParams: {
            duree: 240,
            type: 'ALL'
        }
    });


module.exports = Pages([detect, invent, perso, encyclo, even]);
