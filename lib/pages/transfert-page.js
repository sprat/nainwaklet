var Page = require('./page'),
    analyzer = require('./analyzer'),
    objets = require('./objets');

function analyze(doc) {
    var js = analyzer.getJS(doc),
        obj = objets.analyze(js),
        pager = analyzer.getPager(js);

    return {
        inventaire: obj.inventaire,
        sol: obj.sol,
        pager: pager
    };
}

// TODO: enhance
module.exports = Page('transfert', {
    analyze: analyze
    //enhance: enhance
});
