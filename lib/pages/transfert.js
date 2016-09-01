var Page = require('./page'),
    analyzer = require('./analyzer'),
    objets = require('./objets');

function analyze(doc) {
    var js = analyzer.getJS(doc),
        inventaire = objets.analyze(js),
        pager = analyzer.getPager(js);

    return {
        inventaire: inventaire,
        pager: pager
    };
}

// TODO: enhance
module.exports = Page('transfert', {
    analyze: analyze
    //enhance: enhance
});
