var qs = require('qs');
var dom = require('src/dom');

function getIDS(location) {
    var search = location && location.search;
    return search ? qs.parse(search.substring(1)).IDS : undefined;
}

function analyze(menuDocument/*, date*/) {
    var ids = getIDS(menuDocument.location);
    var tdElements = dom.findAll('.news-titre td', menuDocument);
    var nom = tdElements[1].text();
    var avatar = tdElements[0].find('img').attr('src');

    return {
        nom: nom,
        avatar: avatar,
        ids: ids
    };
}

module.exports = analyze;
