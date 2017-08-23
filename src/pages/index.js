var array = require('core-js/library/fn/array');
var detect = require('./detect');
var even = require('./even');
var perso = require('./perso');
var encyclo = require('./encyclo');
var invent = require('./invent');
var transfert = require('./transfert');
var attaquer = require('./attaquer');

function Pages(pages) {
    function byUrl(url) {
        return array.find(pages, function (page) {
            return page.url === url;
        });
    }

    function byType(type) {
        return array.find(pages, function (page) {
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
    encyclo,
    invent,
    transfert,
    attaquer
]);

module.exports = pages;
