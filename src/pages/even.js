var Page = require('./page');
var analyzers = require('../analyzers');

function analyze(doc, date, context) {
    return {
        evenements: analyzers.evenements(doc, date, context),
        pager: analyzers.pager(doc, date, context)
    };
}

module.exports = Page('even', {
    analyze: analyze,
    fetchParameters: {
        duree: 240,
        type: 'ALL'
    }
});
