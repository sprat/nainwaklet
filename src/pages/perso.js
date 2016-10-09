var Page = require('./page');
var analyzers = require('../analyzers');

function analyze(doc, date, context) {
    return {
        perso: analyzers.perso(doc, date, context)
    };
}

module.exports = Page('perso', {
    analyze: analyze
});
