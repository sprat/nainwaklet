var qs = require('qs');
var dom = require('./dom');

function fromMenu(doc) {
    var search = doc.location && doc.location.search;
    var ids = search ? qs.parse(search.substring(1)).IDS : undefined;
    var tdElements = dom.findAll('.news-titre td', doc);
    var nom = tdElements[1].text();
    var avatar = tdElements[0].find('img').attr('src');

    return {
        nom: nom,
        avatar: avatar,
        ids: ids
    };
}

module.exports = {
    fromMenu: fromMenu
};
