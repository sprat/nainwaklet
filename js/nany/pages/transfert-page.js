var Page = require('./page'),
    analyzer = require('./analyzer'),
    pager = require('./pager'),
    objets = require('./objets');

function analyze(doc, date, infos) {
    var js = analyzer.getJS(doc);

    return {
        objets: objets.analyze(js, infos),
        pager: pager.analyze(js, infos)
    };
}

// TODO: enhance
module.exports = Page('transfert', {
    analyze: analyze
    //enhance: enhance
});
