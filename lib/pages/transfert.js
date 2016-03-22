var Page = require('./page'),
    analyzer = require('./analyzer');

function analyze(doc) {
    var js = analyzer.getJS(doc),
        inventaire = analyzer.getInventaire(js),
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
