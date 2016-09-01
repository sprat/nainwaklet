var detectPage = require('./detect-page'),
    persoPage = require('./perso-page'),
    inventPage = require('./invent-page'),
    transfertPage = require('./transfert-page'),
    evenPage = require('./even-page'),
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
    detectPage,
    inventPage,
    transfertPage,
    persoPage,
    evenPage
]);

module.exports = pages;
