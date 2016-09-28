var detectPage = require('./detect-page');
var persoPage = require('./perso-page');
var inventPage = require('./invent-page');
var transfertPage = require('./transfert-page');
var evenPage = require('./even-page');
var attaquerPage = require('./attaquer-page');
var find = require('array-find');

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
    detectPage,
    inventPage,
    transfertPage,
    persoPage,
    evenPage,
    attaquerPage
]);

module.exports = pages;
