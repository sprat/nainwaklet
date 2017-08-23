var dom = require('src/utilities/dom');
var int = require('./int');

var typesNames = {
    A: 'arme',
    R: 'rune',
    V: 'véhicule',
    D: 'détecteur',
    I: 'inutile',
    B: 'bouffe',
    J: 'jouet'
};

function analyzeListDocument(doc) {
    var newsTexts = dom.findAll('.news-text', doc);

    return newsTexts.map(function (newsText) {
        var linkElement = newsText.find('a');
        var nom = linkElement.text();
        var href = linkElement.attr('href');
        var id = int(href.replace(/JavaScript:detailobj\((\d+)\)/i, '$1'));
        var typeElement = newsText.firstChild();
        var typeLetters = typeElement.text().replace(/\[(\w+)\]\s*/i, '$1').split('');
        var types = typeLetters.map(function (letter) { return typesNames[letter]; });

        return {
            id: id,
            nom: nom,
            types: types
        };
    });
}

function getListDocument(doc) {
    var frame = dom.find('#encycl_liste', doc);
    return frame.node.contentWindow.document;
}

module.exports = {
    analyzeListDocument: analyzeListDocument,
    getListDocument: getListDocument
};
