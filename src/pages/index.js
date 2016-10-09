var detect = require('./detect');
var even = require('./even');
var perso = require('./perso');
var invent = require('./invent');
var transfert = require('./transfert');
var attaquer = require('./attaquer');

function Pages(pages) {
    function byUrl(url) {
        return pages.find(function (page) {
            return page.url === url;
        });
    }

    function byType(type) {
        return pages.find(function (page) {
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
    even,
    perso,
    invent,
    transfert,
    attaquer
]);

module.exports = pages;
