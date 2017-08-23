var dom = require('src/utilities/dom');
var int = require('./int');

function analyze(doc/*, date*/) {
    var listFrame = dom.find('#encycl_liste', doc);
    var listDocument = listFrame.node.contentWindow.document;
    return analyzeList(listDocument);
}

var typesNames = {
    A: 'arme',
    R: 'rune',
    V: 'véhicule',
    D: 'détecteur',
    I: 'inutile',
    B: 'bouffe',
    J: 'jouet'
};

function analyzeList(doc) {
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

module.exports = analyze;
