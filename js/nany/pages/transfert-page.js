var Page = require('./page'),
    analyzer = require('./analyzer'),
    pager = require('./pager'),
    objets = require('./objets');

function analyze(doc) {
    var js = analyzer.getJS(doc),
        objetsData = objets.analyze(js);

    return {
        inventaire: objetsData.inventaire,
        sol: objetsData.sol,
        pager: pager.analyze(js)
    };
}

// TODO: enhance
module.exports = Page('transfert', {
    analyze: analyze
    //enhance: enhance
});
