var Page = require('./page');
var analyzer = require('./analyzer');
var pager = require('./pager');
var objets = require('./objets');

function analyze(doc, date, context) {
    var js = analyzer.getJS(doc);

    return {
        objets: objets.analyze(js, context),
        pager: pager.analyze(js, context)
    };
}

function enhance(doc, context) {
    var objetsList = context.objets.bonnet.concat(context.objets.inventaire);
    objets.enhance(doc, objetsList, context.perso);
}

module.exports = Page('invent', {
    analyze: analyze,
    enhance: enhance
});
