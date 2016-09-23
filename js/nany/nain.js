var qs = require('qs');
var Dom = require('./dom');

function fromDocument(doc) {
    var search = doc.location && doc.location.search;
    var ids = search ? qs.parse(search.substring(1)).IDS : undefined;
    var tdElements = Dom.findAll('.news-titre td', doc);
    var nom = tdElements[1].text();
    var avatar = tdElements[0].find('img').attr('src');

    return {
        nom: nom,
        avatar: avatar,
        ids: ids
    };
}

module.exports = {
    fromDocument: fromDocument
};
