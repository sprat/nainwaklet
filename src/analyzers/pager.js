var code = require('./code');
var int = require('./int');

function analyze(doc/*, date*/) {
    var js = code.getInlineJS(doc);
    var regex = /miseajourpager\((.*)\);/ig;
    var keys = 'pa,pv,pvbase,classeeven,evnonlu,classechat,mesgnonlu,posx,posy,IDS,newmonochat'.split(',');
    var object = code.buildObjectsFromJSSequences(js, regex, keys)[0];

    return {
        PA: int(object.pa),
        vie: int(object.pv),
        position: [int(object.posx), int(object.posy)],
        messagesNonLus: int(object.mesgnonlu),
        nainxpressNonLu: object.newmonochat.indexOf('<b>') === 0
    };
}

module.exports = analyze;
