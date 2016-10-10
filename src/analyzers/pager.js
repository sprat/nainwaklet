var assign = require('core-js/library/fn/object/assign');
var dom = require('../dom');
var code = require('./code');
var int = require('./int');

function analyze(doc, date, context) {
    var js = dom.getInlineJavascript(doc);
    var regex = /miseajourpager\((.*)\);/ig;
    var keys = 'pa,pv,pvbase,classeeven,evnonlu,classechat,mesgnonlu,posx,posy,IDS,newmonochat'.split(',');
    var object = code.buildObjectsFromJSSequences(js, regex, keys)[0];
    var pager = {
        PA: int(object.pa),
        vie: int(object.pv),
        position: [int(object.posx), int(object.posy)],
        messagesNonLus: int(object.mesgnonlu),
        nainxpressNonLu: object.newmonochat.indexOf('<b>') === 0
    };

    context.perso = context.perso || {};
    assign(context.perso, pager);

    return pager;
}

module.exports = analyze;
